import z from 'zod'

const schema = z.object({
  title: z.string().min(4),
  date: z.date(),
  content: z.array(z.string())
})

export function validateData (data) {
  return schema.safeParse(data)
}

export function validatePartialData (data) {
  return schema.partial().safeParse(data)
}
