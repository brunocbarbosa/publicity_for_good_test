import { makeSearhOneProductUseCase } from '@/use-cases/factories/make-search-one-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchOne(req: FastifyRequest, rep: FastifyReply) {
  const searchProductParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = searchProductParamSchema.parse(req.params)

  const getOneUseCase = makeSearhOneProductUseCase()

  const { product } = await getOneUseCase.execute({ id })

  return rep.status(200).send({ product })
}
