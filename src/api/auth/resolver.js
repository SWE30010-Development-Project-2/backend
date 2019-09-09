import User from '../user/model'
import { sign } from '../../services/jwt'

export default {
  Query: {
    authenticate: (parent, args, context) => {
      return User.findOne({ email: args.email })
        .then(user => user.authenticate(args.password))
        .then(user => {
          if (user) {
            return ({
              token: sign(user.id),
              user: user
            })
          }

          console.log(context)
          return new Error('401')
        })
    }
  }
}
