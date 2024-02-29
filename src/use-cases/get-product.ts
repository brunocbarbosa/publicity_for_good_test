import { ProductRepository } from '@/repositories/product-repository'
import { ProductDoNotExistsError } from './errors/product-do-not-exists-error'
import { Products } from '@/utils/types/product'

interface getProductUseCaseRequest {
  id: string
}

interface getProductUseCaseResponse {
  product: Products
}

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: getProductUseCaseRequest): Promise<getProductUseCaseResponse> {
    const product = await this.productRepository.findByid(id)

    if (!product) throw new ProductDoNotExistsError()

    return {
      product,
    }
  }
}
