import { mergeSchemas } from 'graphql-tools'
import UserSchema from './user'
import AuthSchema from './auth'

export default mergeSchemas({
  schemas: [
    UserSchema,
    AuthSchema
  ]
})
