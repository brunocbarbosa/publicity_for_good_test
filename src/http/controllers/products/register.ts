import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-error'
import { makeRegisterProductUseCase } from '@/use-cases/factories/make-register-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    availability: z.boolean(),
  })

  const { name, description, price, availability } = registerBodySchema.parse(
    req.body,
  )

  try {
    const registerUseCase = makeRegisterProductUseCase()

    await registerUseCase.execute({ name, description, price, availability })
  } catch (error) {
    if (error instanceof ProductAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(201).send()
}
