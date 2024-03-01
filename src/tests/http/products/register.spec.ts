import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Computer',
        description: 'New computer',
        price: 240,
        availability: true,
      })

    expect(response.statusCode).toEqual(201)
  })
})
