import { describe, expect, beforeEach, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InMemoryUserRepository } from '../in-memory/in-memory-user-repository'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential-error'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.createUser({
      username: 'john',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      username: 'john',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong username', async () => {
    await expect(() =>
      sut.execute({
        username: 'john',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able to authenticate with a wrong username', async () => {
    await userRepository.createUser({
      username: 'john',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        username: 'john',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
