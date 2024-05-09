import {z} from 'zod'

export const signInSchema = z.object({
    identifier: z.string(),  //Identifer matlab email
    password:z.string()
})