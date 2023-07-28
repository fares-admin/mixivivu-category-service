import { Category } from '@/src/repository/category-repository/category-entity'
import { CategoryRepository } from '@/src/repository/category-repository/category-repository'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import { CategoryReq, CategoryReqError, CategoryReqValidator } from '../category-req'

/*
      @ericchen:
  
      put your explanation here
  */

export const addNewCategoryFunc = async (
  req: CategoryReq,
  repository: CategoryRepository
): Promise<CommonResponse<CategoryReqError | string>> => {
  const validateRes = await validate(req, CategoryReqValidator)
  if (validateRes.isError) {
    return {
      success: false,
      result: {
        ...validateRes.error,
      },
      message: 'invalidRequest',
      status: 400,
    }
  }
  const entity: Category = {
    ...new Category(),
    ...req,
  }

  const { error } = await repository.insert([{ ...entity }])
  if (error) {
    return {
      status: 500,
      message: error || '',
      result: '',
      success: false,
    }
  }
  return {
    status: 200,
    message: 'ok',
    result: '',
    success: true,
  }
}
