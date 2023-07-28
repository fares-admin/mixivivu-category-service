import { Category } from '@/src/repository/category-repository/category-entity'
import { CategoryRepository } from '@/src/repository/category-repository/category-repository'
import { CommonListResult, CommonResponse, CommonService } from 'common-abstract-fares-system'
import { NextApiRequest } from 'next'
import { CategoryReq, CategoryReqError } from './category-req'
import { CategoryRes } from './category-res'
import {
  addNewCategoryFunc,
  deleteCategoryFunc,
  getListCategoryFunc,
  updateCategoryFunc,
} from './category-service-function'
import { getInternalCategoryFunc } from './category-service-function/get-internal-category-func'

export class CategoryService extends CommonService<CategoryRepository> {
  constructor() {
    super(new CategoryRepository())
  }

  public async getListCategories(
    req: NextApiRequest
  ): Promise<CommonResponse<CommonListResult<CategoryRes> | string>> {
    return await getListCategoryFunc(
      req,
      this.repository,
      this.getPageAndSize,
      this.generatePipelineAggregate(req.query, new Category())
    )
  }

  public async addNewCategory(
    req: CategoryReq
  ): Promise<CommonResponse<CategoryReqError | string>> {
    return await addNewCategoryFunc(req, this.repository)
  }

  public async deleteCategory(ids: string): Promise<CommonResponse<string>> {
    return await deleteCategoryFunc(ids, this.repository)
  }

  public async updateCategory(
    id: string,
    req: CategoryReq
  ): Promise<CommonResponse<CategoryReqError | string>> {
    return await updateCategoryFunc(id, this.repository, req)
  }

  public async getInternalCategory(
    serviceToken: string,
    id: string
  ): Promise<CommonResponse<Category | string>> {
    return await getInternalCategoryFunc(serviceToken, id, this.repository)
  }
}
