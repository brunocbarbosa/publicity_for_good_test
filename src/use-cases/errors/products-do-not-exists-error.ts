export class ProductsDoNotExistsError extends Error {
  constructor() {
    super('Products do not exists!!')
  }
}
