import { makeSearhOneProductUseCase } from '@/use-cases/factories/make-search-one-product'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchOne(req: FastifyRequest, rep: FastifyReply) {
  const searchProductParamSchema = z.object({
    productId: z.string().uuid(),
  })

  const { productId } = searchProductParamSchema.parse(req.params)

  const getOneUseCase = makeSearhOneProductUseCase()

  const { product } = await getOneUseCase.execute({ id: productId })

  return rep.status(200).send({ product })
}
