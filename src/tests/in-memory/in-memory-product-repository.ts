import { ProductRepository } from '@/repositories/product-repository'
import { Products } from '@/utils/types/product'
import { randomUUID } from 'node:crypto'

export class InMemoryProductRepository implements ProductRepository {
  public items: Products[] = []

  async findByid(id: string) {
    const product = this.items.find((item) => item.id === id)

    if (!product) return null

    return product
  }

  async findByName(name: string) {
    const product = this.items.find((item) => item.name === name)

    if (!product) return null

    return product
  }

  async createProduct(data: Products) {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      availability: data.availability,
    }

    this.items.push(product)

    return product
  }
}
