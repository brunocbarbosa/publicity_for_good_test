import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryProductRepository } from '../in-memory/in-memory-product-repository'
import { GetProductUseCase } from '@/use-cases/get-product'
import { ProductDoNotExistsError } from '@/use-cases/errors/product-do-not-exists-error'

let productRepository: InMemoryProductRepository
let sut: GetProductUseCase

describe('Get one Products', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new GetProductUseCase(productRepository)
  })

  it('should be able to get one', async () => {
    const product = await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    const res = await sut.execute({ id: product.id })

    expect(res.product).toMatchObject({
      name: 'product',
    })
  })

  it('should not be able to get one', async () => {
    await expect(() => sut.execute({ id: 'id-1' })).rejects.toBeInstanceOf(
      ProductDoNotExistsError,
    )
  })
})
