import Koa from 'koa'
import mount from 'koa-mount'
import graphql from '../graphql'
import '../passport'
import passport from 'passport'

export default () => {
  const app = new Koa()

  app.use(mount(graphql()))
  app.use(passport.initialize())

  return app
}
