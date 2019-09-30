import { mergeSchemas } from 'graphql-tools'
import UserSchema from './user'
import AuthSchema from './auth'
import ProductSchema from './product'
import TransactionSchema from './transaction'

export default mergeSchemas({
  schemas: [
    UserSchema,
    AuthSchema,
    ProductSchema,
    TransactionSchema
  ]
})
