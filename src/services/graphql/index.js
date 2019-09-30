import Context from './context'
import passport from 'passport'
import Authorization from './services/Authorization'
import { AuthenticationError } from 'apollo-server-koa'

export default ({ request, response }) => {
  const context = new Context(request, response)

  return new Promise((resolve, reject) => {
    const next = () => {
      resolve(context)
    }

    passport.authenticate('bearer', { session: false }, (error, user) => {
      if (error) {
        response.status = 401
        reject(new AuthenticationError('invalid access_token'))
      }

      context.services.Authorization = new Authorization(user)
      next()
    })(request, response, next)
  })
}
