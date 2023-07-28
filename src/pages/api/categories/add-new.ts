import { CategoryService } from '@/src/service/category-service/category-service'
import { InternalAuthService } from '@/src/service/internal-auth-service/internal-auth-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const internalService = new InternalAuthService()
  const authResult = await internalService.authUserToken(req.headers.authorization || '')
  if (!authResult.success) {
    res.status(200).json(authResult)
  }
  const service = new CategoryService()
  const result = await wrapperEndpoint(req, 'POST', service.addNewCategory(req.body))
  res.status(200).json(result)
}
