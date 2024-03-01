import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/api/login', authenticate)
}
