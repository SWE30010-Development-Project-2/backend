import _ from 'lodash'
import Product from './model'
import { notFound } from '../../services/response'

export default {
  Query: {
    products: (parent, args, context) => {
      return Product.find({})
        .then(products => products.map((product) => product.view(true)))
        .catch(error => console.log(error))
    },
    product: (parent, args, context) => {
      return Product.findById(args.id)
        .then(notFound(context))
        .then(product => product.view(true))
        .catch(error => throw error)
    }
  },
  Mutation: {
    addProduct: (parent, args) => {
      return new Product(args).save()
    },
    updateProduct: (parent, args, context) => {
      return Product.findById(args.id)
        .then(notFound(context))
        .then(product => product ? _.merge(product, args).save() : null)
        .then(product => product ? product.view(true) : null)
    },
    removeProduct: (parent, args, context) => {
      return Product.findById(args.id)
        .then(notFound(context))
        .then(product => product ? product.remove() : null)
    }
  }
}
