import { Products } from '@/utils/types/product'

export interface ProductRepository {
  findAll(): Promise<Products[] | null>
  findByid(id: string): Promise<Products | null>
  findByName(name: string): Promise<Products | null>
  saveProduct(data: Products): Promise<void>
  createProduct(data: Products): Promise<Products>
  delete(id: string): Promise<void>
}
