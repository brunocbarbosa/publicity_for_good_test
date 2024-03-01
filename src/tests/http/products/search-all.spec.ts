import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search All (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search all products', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Computer',
        description: 'New computer',
        price: 240,
        availability: true,
      })

    await request(app.server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'CellPhone',
        description: 'New phone',
        price: 100,
        availability: true,
      })

    const response = await request(app.server)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.products).toHaveLength(2)
  })
})
