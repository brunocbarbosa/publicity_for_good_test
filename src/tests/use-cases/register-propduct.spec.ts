import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryProductRepository } from '../in-memory/in-memory-product-repository'
import { RegisterProductUseCase } from '@/use-cases/register-product'
import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-error'

let product: InMemoryProductRepository
let sut: RegisterProductUseCase

describe('Register Product', () => {
  beforeEach(() => {
    product = new InMemoryProductRepository()
    sut = new RegisterProductUseCase(product)
  })

  it('should be able to register', async () => {
    const { product } = await sut.execute({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    expect(product.id).toEqual(expect.any(String))
  })

  it('should not be able to register', async () => {
    await sut.execute({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    await expect(() =>
      sut.execute({
        name: 'product',
        description: 'description',
        price: 11,
        availability: true,
      }),
    ).rejects.toBeInstanceOf(ProductAlreadyExistsError)
  })
})
