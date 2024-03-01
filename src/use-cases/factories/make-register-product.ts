import { PrismaProductRepository } from '@/tests/prisma/product-repository'
import { RegisterProductUseCase } from '../register-product'

export function makeRegisterProductUseCase() {
  const prismaProductRepository = new PrismaProductRepository()
  const registerProductUseCase = new RegisterProductUseCase(
    prismaProductRepository,
  )

  return registerProductUseCase
}
