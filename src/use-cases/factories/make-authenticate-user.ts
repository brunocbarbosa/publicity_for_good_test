import { PrismaUserRepository } from '@/repositories/prisma/user-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUserUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const authenticateUserUseCase = new AuthenticateUseCase(prismaUserRepository)

  return authenticateUserUseCase
}
