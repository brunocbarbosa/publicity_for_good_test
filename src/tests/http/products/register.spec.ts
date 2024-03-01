import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/products').send({
      name: 'Computer',
      description: 'New computer',
      price: 240,
      availability: true,
    })

    expect(response.statusCode).toEqual(201)
  })
})
