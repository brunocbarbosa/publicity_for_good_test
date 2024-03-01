import { makeDeleteProductUseCase } from '@/use-cases/factories/make-delete-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function erase(req: FastifyRequest, rep: FastifyReply) {
  const searchProductParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = searchProductParamSchema.parse(req.params)

  const deleteUseCase = makeDeleteProductUseCase()

  await deleteUseCase.execute({ id })

  return rep.status(201).send()
}
