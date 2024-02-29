import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryProductRepository } from '../in-memory/in-memory-product-repository'
import { ProductDoNotExistsError } from '@/use-cases/errors/product-do-not-exists-error'
import { DeleteProductUseCase } from '@/use-cases/delete-product'

let productRepository: InMemoryProductRepository
let sut: DeleteProductUseCase

describe('Delete one Product', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new DeleteProductUseCase(productRepository)
  })

  it('should be able to delete product', async () => {
    const product = await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    await sut.execute({
      id: product.id,
    })

    expect(productRepository.items).toHaveLength(0)
  })

  it('should not be able to delete product', async () => {
    const product = await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    await expect(() =>
      sut.execute({
        id: `${product.id}-product`,
      }),
    ).rejects.toBeInstanceOf(ProductDoNotExistsError)
  })
})
