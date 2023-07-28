import { CategoryService } from '@/src/service/category-service/category-service'
import { wrapperEndpoint } from 'common-abstract-fares-system'
import { NextApiRequest, NextApiResponse } from 'next'

/*
    @ericchen:

    put your explanation here
*/

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new CategoryService()
  const result = await wrapperEndpoint(
    req,
    'GET',
    service.getInternalCategory(
      req.query.ServiceToken?.toString() || '',
      req.query.id?.toString() || ''
    )
  )
  res.status(200).json(result)
}
