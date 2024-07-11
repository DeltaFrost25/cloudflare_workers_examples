import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const schemaUser = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
})

export const zUserValidator = zValidator('form', schemaUser)