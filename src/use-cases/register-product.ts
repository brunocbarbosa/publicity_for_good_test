import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-error'
import { ProductRepository } from '@/repositories/product-repository'
import { Products } from '@/utils/types/product'

interface regiterProductUseCaseRequest {
  name: string
  description: string
  price: number
  availability: boolean
}

interface regiterProductUseCaseResponse {
  product: Products
}

export class RegisterProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
    availability,
  }: regiterProductUseCaseRequest): Promise<regiterProductUseCaseResponse> {
    const productExists = await this.productRepository.findByName(name)

    if (productExists) throw new ProductAlreadyExistsError()

    const product = await this.productRepository.createProduct({
      name,
      description,
      price,
      availability,
    })

    return {
      product,
    }
  }
}
