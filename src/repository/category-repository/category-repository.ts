import { CommonRepository } from 'common-abstract-fares-system'
import { Category, CategorySchema } from './category-entity'

export class CategoryRepository extends CommonRepository<Category> {
  constructor() {
    super(CategorySchema, 'categories')
  }
}
