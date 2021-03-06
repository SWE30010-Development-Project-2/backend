import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolver'

export default makeExecutableSchema({
  typeDefs: importSchema('./src/api/transaction/schema.graphql'),
  resolvers
})
