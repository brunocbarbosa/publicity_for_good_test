import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Search One (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search one product', async () => {
    const product = await prisma.product.create({
      data: {
        name: 'Computer',
        description: 'New computer',
        price: 240,
        availability: true,
      },
    })

    const response = await request(app.server)
      .get(`/products/${product.id}`)
      .send()

    expect(response.statusCode).toEqual(201)
  })
})
