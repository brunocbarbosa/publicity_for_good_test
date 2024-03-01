import { UserRepository } from '@/repositories/user-repository'
import { Users } from '@/utils/types/users'
import { randomUUID } from 'crypto'

export class InMemoryUserRepository implements UserRepository {
  public items: Users[] = []

  async findByid(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) return null

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (!user) return null

    return user
  }

  async createUser(data: Users) {
    const user = {
      id: randomUUID(),
      username: data.username,
      password: data.password,
    }

    this.items.push(user)

    return user
  }
}
