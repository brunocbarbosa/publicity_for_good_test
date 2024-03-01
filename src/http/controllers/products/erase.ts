import { makeDeleteProductUseCase } from '@/use-cases/factories/make-delete-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function erase(req: FastifyRequest, rep: FastifyReply) {
  const searchProductParamSchema = z.object({
    productId: z.string().uuid(),
  })

  const { productId } = searchProductParamSchema.parse(req.params)

  const deleteUseCase = makeDeleteProductUseCase()

  await deleteUseCase.execute({ id: productId })

  return rep.status(201).send()
}
