import { ProductRepository } from '@/repositories/product-repository'
import { ProductsDoNotExistsError } from './errors/products-do-not-exists-error'
import { Products } from '@/utils/types/product'

interface getProductsUseCaseResponse {
  products: Products[]
}

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<getProductsUseCaseResponse> {
    const products = await this.productRepository.findAll()

    if (!products) throw new ProductsDoNotExistsError()

    return {
      products,
    }
  }
}
