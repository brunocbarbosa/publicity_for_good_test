import { ProductRepository } from '@/repositories/product-repository'
import { ProductDoNotExistsError } from './errors/product-do-not-exists-error'

interface editProductUseCaseRequest {
  id: string
  name?: string
  description?: string
  price?: number
  availability?: boolean
}

interface editProductUseCaseResponse {}

export class EditProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    description,
    price,
    availability,
  }: editProductUseCaseRequest): Promise<editProductUseCaseResponse> {
    const product = await this.productRepository.findByid(id)

    if (!product) throw new ProductDoNotExistsError()

    if (name !== undefined) product.name = name
    if (description !== undefined) product.description = description
    if (price !== undefined) product.price = price
    if (availability !== undefined) product.availability = availability

    // const ruralProducerWithoutPlantedCrops: RuralProducerWithoutPlantedCrops = {
    //   id: product.id,
    //   name: product.name,
    //   description: product.description,
    //   price: product.price,
    //   availability: product.availability,
    // }

    if (
      name !== undefined ||
      description !== undefined ||
      price !== undefined ||
      availability !== undefined
    ) {
      await this.productRepository.saveProduct(product)
    }

    return {}
  }
}
