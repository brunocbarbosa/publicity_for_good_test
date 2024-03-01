import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.user.create({
    data: {
      username: 'jhon',
      password: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/api/login').send({
    username: 'jhon',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
