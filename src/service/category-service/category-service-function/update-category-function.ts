import { Category } from '@/src/repository/category-repository/category-entity'
import { CategoryRepository } from '@/src/repository/category-repository/category-repository'
import { CommonResponse, validate } from 'common-abstract-fares-system'
import mongoose from 'mongoose'
import { CategoryReq, CategoryReqError, CategoryReqValidator } from '../category-req'

export const updateCategoryFunc = async (
  id: string,
  repo: CategoryRepository,
  req: CategoryReq
): Promise<CommonResponse<CategoryReqError | string>> => {
  if (!id || !mongoose.isValidObjectId(id)) {
    return {
      status: 400,
      success: true,
      message: 'invalid Id',
      result: '',
    }
  }
  const findId = await repo.findOne('_id', new mongoose.Types.ObjectId(id))
  if (!findId.result) {
    return {
      success: false,
      message: 'not found image',
      result: '',
      status: 404,
    }
  }
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
    ...findId.result,
    ...req,
  }

  const result = await repo.update([entity])
  if (result.error) {
    return {
      status: 500,
      success: false,
      message: String(result.error),
      result: '',
    }
  }
  return {
    status: 200,
    success: true,
    message: 'success',
    result: '',
  }
}
