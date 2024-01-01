import { Router, NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: [{ name: 'sepatu', price: 500000 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Err = product-create', error.details[0].message)
    return res.status(422).send({ status: false, statuseCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('Success post new product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add Product Success', data: value })
})
