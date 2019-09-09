import passport from 'passport'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { verify } from '../jwt'
import User from '../../api/user/model'

passport.use('bearer', new BearerStrategy((token, done) => {
  verify(token)
    .then(token => {
      console.log('token', token)
      User.findById(token.id)
        .then(user => user ? done(null, user.view(true)) : done(null, false))
        .catch(error => done(error))
    })
    .catch(error => done(error))
}))
