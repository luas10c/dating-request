import zod from 'zod'

export const create = zod.object({
  email: zod.string().email(),
  request_from: zod.string().min(2),
  request_to: zod.string().min(2)
})
