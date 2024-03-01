import { Users } from '@/utils/types/users'

export interface UserRepository {
  findByid(id: string): Promise<Users | null>
  findByUsername(username: string): Promise<Users | null>
  createUser(data: Users): Promise<Users>
}
