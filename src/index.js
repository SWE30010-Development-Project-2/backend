import koa from './services/koa'
import mongoose from './services/mongoose'
import { env, mongo, port, ip } from './config'

const app = koa()

mongoose.connect(mongo.uri)

app.listen(port, ip, () => {
  console.log('Koa server listening on http://%s:%d, in %s mode', ip, port, env)
})

export default app
