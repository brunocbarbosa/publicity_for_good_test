import { PrismaProductRepository } from '@/tests/prisma/product-repository'
import { DeleteProductUseCase } from '../delete-product'

export function makeDeleteProductUseCase() {
  const prismaProductRepository = new PrismaProductRepository()
  const getProductUseCase = new DeleteProductUseCase(prismaProductRepository)

  return getProductUseCase
}
