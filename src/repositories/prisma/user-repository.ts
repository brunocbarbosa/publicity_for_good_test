import { prisma } from '@/lib/prisma'
import { UserRepository } from '@/repositories/user-repository'
import { Users } from '@/utils/types/users'

export class PrismaUserRepository implements UserRepository {
  async findByid(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUsername(username: string) {
    return prisma.user.findFirst({
      where: {
        username,
      },
    })
  }

  async createUser(data: Users) {
    return prisma.user.create({
      data,
    })
  }
}
