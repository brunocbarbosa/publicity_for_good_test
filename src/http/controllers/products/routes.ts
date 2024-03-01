import { FastifyInstance } from 'fastify'
import { register } from './register'
import { searchAll } from './search-all'
import { searchOne } from './search-one'
import { edit } from './edit'
import { erase } from './erase'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function productsRoutes(app: FastifyInstance) {
  app.post('/api/products', { onRequest: [verifyJWT] }, register)
  app.patch('/api/products/:id', { onRequest: [verifyJWT] }, edit)
  app.get('/api/products', { onRequest: [verifyJWT] }, searchAll)
  app.get('/api/products/:id', { onRequest: [verifyJWT] }, searchOne)
  app.delete('/api/products/:id', { onRequest: [verifyJWT] }, erase)
}
