import User from '../user/model'
import { AuthenticationError } from 'apollo-server-koa'
import { sign } from '../../services/jwt'
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
    }
  }
}
