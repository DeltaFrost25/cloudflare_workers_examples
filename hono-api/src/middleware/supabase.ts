import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Context, MiddlewareHandler } from 'hono'

type SupabaseBindings = {
    SUPABASE_URL: string
    SUPABASE_KEY: string
}

export const idCtxSupabase = 'supabase-ctx'
type SupabaseCtx = {
    Bindings: SupabaseBindings,
    Variables: {
        [idCtxSupabase]: SupabaseClient<any, "public", any>
    }
}

export const supabaseMiddleware: MiddlewareHandler<SupabaseCtx> = async (c, next) => {
    try {
        if (!c.env.SUPABASE_URL) {
            throw new Error('Supabase env var SUPABASE_URL not found')
        }

        if (!c.env.SUPABASE_KEY) {
            throw new Error('Supabase env var SUPABASE_KEY not found')
        }

        const supabase = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_KEY)
        c.set(idCtxSupabase, supabase)
        c.get
        await next()

    } catch (error) {
        return c.json({ error }, 500)
    }
}

export const getSupabase = (c: Context): SupabaseClient =>  c.get(idCtxSupabase)
