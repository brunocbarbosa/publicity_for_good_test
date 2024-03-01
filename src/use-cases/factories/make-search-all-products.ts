import { PrismaProductRepository } from '@/repositories/prisma/product-repository'
import { GetProductsUseCase } from '../get-products'

export function makeSearhAllProductsUseCase() {
  const prismaProductRepository = new PrismaProductRepository()
  const getProductsUseCase = new GetProductsUseCase(prismaProductRepository)

  return getProductsUseCase
}
