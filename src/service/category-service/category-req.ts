import { IS_REQUIRED, ObjectValidator } from 'common-abstract-fares-system'

export class CategoryReq {
  name: string = ''

  image: string = ''
}

export const CategoryReqValidator: ObjectValidator<CategoryReq> = {
  name: IS_REQUIRED,
  image: IS_REQUIRED,
}

export type CategoryReqError = Record<keyof CategoryReq, string>
