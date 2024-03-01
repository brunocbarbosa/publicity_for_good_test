import { FastifyInstance } from 'fastify'
import { register } from './register'
import { searchAll } from './search-all'
import { searchOne } from './search-one'
import { edit } from './edit'
import { erase } from './erase'

export async function productsRoutes(app: FastifyInstance) {
  app.post('/api/products', register)
  app.patch('/api/products/:id', edit)
  app.get('/api/products', searchAll)
  app.get('/api/products/:id', searchOne)
  app.delete('/api/products/:id', erase)
}
