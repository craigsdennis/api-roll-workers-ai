import { Hono } from 'hono';
import { streamText } from 'hono/streaming';
import { events } from 'fetch-event-stream';
import { stripIndents } from 'common-tags';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

type Env = {
	AI: Ai;
};

const app = new Hono<{ Bindings: Env }>();

app.post(
	'/api/categories',
	zValidator(
		'json',
		z.object({
			situation: z.string().describe('The situation you are looking to create categories of puns for'),
		})
	),
	async (c) => {
		const payload = await c.req.valid('json');
		const CATEGORY_SYSTEM_PROMPT = stripIndents`You are a dad assistant.

		The user is going to explain the situation and your job is to assist by providing possible categories for which to make a bad pun.

		Break down what the user said into a list of categories that provide rich pun opportunities for a dad using your service.

		Return only the categories separated by commas.

		Do not include an introduction or surrounding explanation.
	`;

		const result = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
			messages: [
				{ role: 'system', content: CATEGORY_SYSTEM_PROMPT },
				{ role: 'user', content: payload.situation },
			],
		});
		const categories = result.response.split(/[ ,]+/);
		return c.json({ categories });
	}
);

app.post(
	'/api/pun',
	zValidator(
		'json',
		z.object({
			situation: z.string().describe('The situation you are looking to create puns for'),
			category: z.string().default('dad joke').describe('Which category to narrow things into'),
		})
	),
	async (c) => {
		const payload = await c.req.json();
		const category = payload.category;
		const PUN_PROMPT = `You are a dad and make obvious puns that make your people's eyes roll.

		It is a gift of yours.

		The user is going to tell you a situation.

		Your task is to create the best possible pun, and try to scope it to ${category}.

		Return only the pun, and make sure to highlight the punniest parts.
		`;
		const eventSourceStream = (await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
			messages: [
				{ role: 'system', content: PUN_PROMPT },
				{ role: 'user', content: payload.situation },
			],
			stream: true,
		})) as ReadableStream;

		return streamText(c, async (stream) => {
			const chunks = events(new Response(eventSourceStream));
			for await (const chunk of chunks) {
				if (chunk.data === undefined) {
					continue;
				}
				if (chunk.data !== '[DONE]') {
					const data = JSON.parse(chunk.data);
					stream.write(data.response);
				}
			}
		});
	}
);

export default app;
