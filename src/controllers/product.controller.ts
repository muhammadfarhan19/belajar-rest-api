import { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'

export const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Err = product-create', error.details[0].message)
    return res.status(422).send({ status: false, statuseCode: 422, message: error.details[0].message, data: {} })
  }
  logger.info('Success post new product')
  return res.status(200).send({ status: true, statusCode: 200, message: 'Add Product Success', data: value })
}

export const getProduct = (req: Request, res: Response) => {
  const products = [
    {
      name: 'Sepatu',
      price: 200000
    },
    {
      name: 'Kaos',
      price: 150000
    }
  ]
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product) => {
      if (product.name === name) {
        return product
      }
    })
    if (filterProduct.length === 0) {
      logger.info('Data not found')
      return res.status(200).send({ status: false, statusCode: 404, data: {} })
    }
    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: filterProduct[0] })
  }

  logger.info('Success get product data')
  return res.status(200).send({ status: true, statusCode: 200, data: products })
}
