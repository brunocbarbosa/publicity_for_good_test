import { Products } from '@/utils/types/product'

export interface ProductRepository {
  findAll(): Promise<string[] | null>
  findByid(id: string): Promise<Products | null>
  findByName(name: string): Promise<Products | null>
  createProduct(data: Products): Promise<Products>
}
