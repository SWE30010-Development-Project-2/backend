import User from '../user/model'
import { AuthenticationError } from 'apollo-server-koa'
import { sign, verify } from '../../services/jwt'
import { notFound } from '../../services/response'

export default {
  Query: {
    authenticate: (parent, args, context) => {
      return User.findOne({ email: args.email })
        .then(notFound(context))
        .then(user => user.authenticate(args.password))
        .then(user => {
          return ({
            token: sign(user.id),
            user: user
          })
        }).catch(() => throw new AuthenticationError('invalid email or password combination'))
    },
    verify: (parent, args, context) => {
      return User.findOne({ id: verify(args.token).id })
        .then(notFound(context))
        .then(user => {
          if (user) {
            return {
              token: sign(user.id),
              user: user
            }
          }

          return new AuthenticationError('Unauthorized')
        })
        .catch(error => error)
    }
  }
}
