import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryProductRepository } from '../in-memory/in-memory-product-repository'
import { GetProductsUseCase } from '@/use-cases/get-products'
import { ProductsDoNotExistsError } from '@/use-cases/errors/products-do-not-exists-error'

let productRepository: InMemoryProductRepository
let sut: GetProductsUseCase

describe('Get all Products', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetProductsUseCase(productRepository)
  })

  it('should be able to get all', async () => {
    await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    const res = await sut.execute()

    expect(res.products).length(2)
  })

  it('should not be able to get all', async () => {
    await expect(() => sut.execute()).rejects.toBeInstanceOf(
      ProductsDoNotExistsError,
    )
  })
})
