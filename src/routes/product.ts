import { Router, NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'sepatu', price: 500000 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success post new product')
  res.status(200).send({ status: true, statusCode: 200, data: req.body })
})
