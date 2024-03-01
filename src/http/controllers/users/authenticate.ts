import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authenticateSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
  })

  const { username, password } = authenticateSchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUserUseCase()

    const { user } = await authenticateUseCase.execute({
      username,
      password,
    })

    const token = await rep.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return rep.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
