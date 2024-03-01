import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Edit (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a product', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const product = await prisma.product.create({
      data: {
        name: 'Computer',
        description: 'New computer',
        price: 240,
        availability: true,
      },
    })

    const response = await request(app.server)
      .patch(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Computer edited',
      })

    expect(response.statusCode).toEqual(204)
  })
})
