import { Hono } from "hono";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

//GET /movies => List all movies
app.get("/", async (c) => {
	const resp = await c.env.DB.prepare("SELECT * FROM movies")
		.all();
	const movies = resp.results
	return c.json(movies);
});

//GET /favorites => List all favorite movies (sorted by rating)
app.get("/favorites", async (c) => {
	const resp = await c.env.DB.prepare("SELECT * FROM movies order by rating desc limit 3")
		.all();
	const movies = resp.results
	return c.json(movies);
});

//PUT /movies/:id => re-rate a movie
app.put("/movies/:id", async (c) => {
	const body = await c.req.json();
	const resp = await c.env.DB.prepare("UPDATE movies SET rating = ?1 WHERE id = ?2 RETURNING *")
		.bind(body.rating, c.req.param("id"))
		.run();

	const ok = resp.success;
	return c.json({ ok });
});

export default app;