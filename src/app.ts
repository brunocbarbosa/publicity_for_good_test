import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { productsRoutes } from './http/controllers/products/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(productsRoutes)
app.register(usersRoutes)

app.setErrorHandler((error, _req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  return rep.status(500).send({ message: 'Internal server error' })
})
