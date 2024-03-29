import { PrismaProductRepository } from '@/repositories/prisma/product-repository'
import { EditProductUseCase } from '../edit-product'

export function makeEditProductUseCase() {
  const prismaProductRepository = new PrismaProductRepository()
  const registerProductUseCase = new EditProductUseCase(prismaProductRepository)

  return registerProductUseCase
}
