import { FastifyInstance } from 'fastify'
import { register } from './register'
import { searchAll } from './search-all'
import { searchOne } from './search-one'
import { edit } from './edit'
import { erase } from './erase'

export async function productsRoutes(app: FastifyInstance) {
  app.post('/products', register)
  app.patch('/products/:productId', edit)
  app.get('/products', searchAll)
  app.get('/products/:productId', searchOne)
  app.delete('/products/:productId', erase)
}
