import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search All (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search all products', async () => {
    await request(app.server).post('/products').send({
      name: 'Computer',
      description: 'New computer',
      price: 240,
      availability: true,
    })

    await request(app.server).post('/products').send({
      name: 'CellPhone',
      description: 'New phone',
      price: 100,
      availability: true,
    })

    const response = await request(app.server).get('/products').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.products).toHaveLength(2)
  })
})
