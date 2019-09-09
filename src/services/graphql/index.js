import graphqlHTTP from 'koa-graphql'
import Context from './context'
import schema from '../../api/schema'
import passport from 'passport'
import Authorization from './services/Authorization'

export default () => graphqlHTTP((req, res) => {
  const context = new Context({ req, res })
  //
  // passport.authenticate('bearer', { session: false }, (err, user, info) => {
  //     context.services['Authorization'] = new Authorization(user)
  //     console.log(context)
  // })(req, res);
  //
  //
  // return {
  //     context,
  //     graphiql: process.env.NODE_ENV !== 'production',
  //     pretty: true,
  //     schema
  // }

  return new Promise((resolve, reject) => {
    const next = () => {
      resolve({
        context,
        graphiql: process.env.NODE_ENV !== 'production',
        pretty: true,
        schema
      })
    }

    passport.authenticate('bearer', { session: false }, (err, user) => {
      context.services.Authorization = new Authorization(user)
      next()
    })(req, res, next)
  })
})
