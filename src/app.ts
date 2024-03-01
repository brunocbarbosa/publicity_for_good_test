import fastify from 'fastify'
import { ZodError } from 'zod'
import { productsRoutes } from './http/controllers/products/routes'

export const app = fastify()

app.register(productsRoutes)

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  return rep.status(500).send({ message: 'Internal server error' })
})
