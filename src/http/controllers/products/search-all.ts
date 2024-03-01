import { makeSearhAllProductsUseCase } from '@/use-cases/factories/make-search-all-products'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchAll(req: FastifyRequest, rep: FastifyReply) {
  const getAllUseCase = makeSearhAllProductsUseCase()

  const { products } = await getAllUseCase.execute()

  return rep.status(200).send({ products })
}
