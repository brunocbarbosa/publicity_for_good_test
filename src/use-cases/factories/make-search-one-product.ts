import { PrismaProductRepository } from '@/repositories/prisma/product-repository'
import { GetProductUseCase } from '../get-product'

export function makeSearhOneProductUseCase() {
  const prismaProductRepository = new PrismaProductRepository()
  const getProductUseCase = new GetProductUseCase(prismaProductRepository)

  return getProductUseCase
}
