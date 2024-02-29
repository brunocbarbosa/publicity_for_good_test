import { describe, expect, beforeEach, it } from 'vitest'
import { InMemoryProductRepository } from '../in-memory/in-memory-product-repository'
import { ProductDoNotExistsError } from '@/use-cases/errors/product-do-not-exists-error'
import { EditProductUseCase } from '@/use-cases/edit-product'

let productRepository: InMemoryProductRepository
let sut: EditProductUseCase

describe('Edit one Product', () => {
  beforeEach(() => {
    productRepository = new InMemoryProductRepository()
    sut = new EditProductUseCase(productRepository)
  })

  it('should be able to edit product', async () => {
    const product = await productRepository.createProduct({
      name: 'product',
      description: 'description',
      price: 11,
      availability: true,
    })

    await sut.execute({
      id: product.id,
      name: 'product edit',
    })

    expect(productRepository.items[0]).toMatchObject({
      name: 'product edit',
    })
  })

  it('should not be able to edit product', async () => {
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
