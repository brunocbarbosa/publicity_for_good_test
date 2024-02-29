export class ProductDoNotExistsError extends Error {
  constructor() {
    super('Product do not exists!!')
  }
}
