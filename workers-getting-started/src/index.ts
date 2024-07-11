import { Ai } from "@cloudflare/ai";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from "hono";

type Bindings = {
	AI: Ai
}

const app = new Hono<{ Bindings: Bindings }>();

// Get /?query="How is your day?"
app.get("/", async (c) => {
	const ai = c.env.AI;
	const content = c.req.query("query") || "tell me a joke";
	const messages = [
		{ role: "system", content: "you like emojis and you only respond in spanish" },
		{ role: "user", content },
	];
	const inputs = { messages}
	const res = await ai.run("@cf/meta/llama-2-7b-chat-fp16", inputs); 

	return c.json(res);
});

export default app/* {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(JSON.stringify({hello: "world"}), {
			headers: { "content-type": "application/json" },
		});
	},
} satisfies ExportedHandler<Env>;
 */