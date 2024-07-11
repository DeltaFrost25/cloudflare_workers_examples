import { Hono } from "hono"
import { zUserValidator } from "./validator"
import { getSupabase, supabaseMiddleware } from "../middleware/supabase"

const appUser = new Hono()
appUser.use('*', supabaseMiddleware)

/* 
 * Ruta para consultar los usuarios en supabase
*/
appUser.get('/', async (c) => {
    const supabase = getSupabase(c)
    const { data, error } = await supabase.from('users').select('*')
    return c.json({ data, error })
})

/* 
  * Ruta para crear un usuario en supabase
*/
appUser.post('/', zUserValidator, async (c) => {
    const body = await c.req.parseBody()
    const supabase = getSupabase(c)
    const { data, error } = await supabase.from('users').insert(body).select()
    return c.json({ data, error })
})

export default appUser