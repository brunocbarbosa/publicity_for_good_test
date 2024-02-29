import { ProductRepository } from '@/repositories/product-repository'
import { ProductDoNotExistsError } from './errors/product-do-not-exists-error'

interface deleteProductUseCaseRequest {
  id: string
}

interface deleteProductUseCaseResponse {}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: deleteProductUseCaseRequest): Promise<deleteProductUseCaseResponse> {
    const product = await this.productRepository.findByid(id)

    if (!product) throw new ProductDoNotExistsError()

    await this.productRepository.delete(id)

    return {}
  }
}
