import { UserRepository } from '@/repositories/user-repository'
import { Users } from '@/utils/types/users'
import { compare } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credential-error'

interface authenticateUseCaseRequest {
  username: string
  password: string
}

interface authenticateUseCaseResponse {
  user: Users
}
export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    username,
    password,
  }: authenticateUseCaseRequest): Promise<authenticateUseCaseResponse> {
    const user = await this.userRepository.findByUsername(username)

    if (!user) throw new InvalidCredentialError()

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) throw new InvalidCredentialError()

    return {
      user,
    }
  }
}
