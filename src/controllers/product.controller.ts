import { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductByID, getProductFromDB } from '../services/product.services'
import { v4 as uuidv4 } from 'uuid'

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('Err = product-create', error.details[0].message)
    return res.status(422).send({ status: false, statuseCode: 422, message: error.details[0].message })
  }
  try {
    await addProductToDB(value)
    logger.info('Success post new product')
    return res.status(201).send({ status: true, statusCode: 201, message: 'Add Product Success' })
  } catch (error) {
    logger.error('Err = product-create', error)
    return res.status(422).send({ status: false, statuseCode: 422, message: error })
  }
}

export const getProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductByID(id)
    if (product) {
      logger.info('Success get product data')
      return res.status(200).send({ status: true, statusCode: 200, data: product })
    } else {
      return res.status(200).send({ status: true, statusCode: 404, message: 'Data not found', data: {} })
    }
  } else {
    const products: any = await getProductFromDB()
    logger.info('Success get product data')
    return res.status(200).send({ status: true, statusCode: 200, data: products })
  }
}

/*
YemwhQsbPSH8iVGt
*/
