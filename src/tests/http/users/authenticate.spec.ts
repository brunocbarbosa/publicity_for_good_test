import request from 'supertest'
import { app } from '@/app'
import { describe, afterAll, beforeAll, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await prisma.user.create({
      data: {
        username: 'jhon',
        password: await hash('123456', 6),
      },
    })

    const res = await request(app.server).post('/api/login').send({
      username: 'jhon',
      password: '123456',
    })

    expect(res.statusCode).toEqual(200)
  })
})
