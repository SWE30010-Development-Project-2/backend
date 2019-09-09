export default class Authorization {
  constructor (user) {
    this.type = 'bearer'
    this.user = user
  }
}
