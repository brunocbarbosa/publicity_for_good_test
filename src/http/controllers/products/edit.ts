import { ProductDoNotExistsError } from '@/use-cases/errors/product-do-not-exists-error'
import { makeEditProductUseCase } from '@/use-cases/factories/make-edit-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function edit(req: FastifyRequest, rep: FastifyReply) {
  const editProductParamSchema = z.object({
    productId: z.string().uuid(),
  })

  const editProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    availability: z.boolean().optional(),
  })

  const { productId } = editProductParamSchema.parse(req.params)

  const { name, description, price, availability } = editProductSchema.parse(
    req.body,
  )

  try {
    const editUseCase = makeEditProductUseCase()

    await editUseCase.execute({
      id: productId,
      name,
      description,
      price,
      availability,
    })
  } catch (error) {
    if (error instanceof ProductDoNotExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(204).send()
}
