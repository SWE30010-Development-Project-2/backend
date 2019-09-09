import * as services from './services'

export default class Context {
  constructor ({ req, res }) {
    this.request = req
    this.response = res
    this.services = {}

    for (const [name, Service] of Object.entries(services)) {
      const service = new Service()

      if (service.initialize) {
        service.initialize({
          context: this
        })
      }

      this.services[name] = service
    }
  }

  get ip () {
    return this.request.ip
  }
}
