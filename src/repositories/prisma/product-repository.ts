import { prisma } from '@/lib/prisma'
import { ProductRepository } from '@/repositories/product-repository'
import { Products } from '@/utils/types/product'

export class PrismaProductRepository implements ProductRepository {
  async findAll() {
    return prisma.product.findMany()
  }

  async findByid(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
    })
  }

  async findByName(name: string) {
    return prisma.product.findFirst({
      where: {
        name,
      },
    })
  }

  async saveProduct(data: Products) {
    await prisma.product.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async createProduct(data: Products) {
    return prisma.product.create({
      data,
    })
  }

  async delete(id: string) {
    await prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
