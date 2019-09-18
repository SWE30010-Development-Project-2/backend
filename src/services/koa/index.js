import Koa from 'koa'
import cors from '@koa/cors'
import { ApolloServer } from 'apollo-server-koa'
import { graphqlUploadKoa } from 'graphql-upload'
import schema from '../../api/schema'
import graphql from '../graphql'
import '../passport'

export default () => {
  const app = new Koa()
  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => {
      return graphql(ctx)
    }
  })

  app.use(cors())
  app.use(server.getMiddleware())
  app.use(graphqlUploadKoa({ maxFileSize: 10000000, maxFiles: 8 }))

  return app
}
