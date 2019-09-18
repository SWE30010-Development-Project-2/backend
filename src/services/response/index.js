import { UserInputError, AuthenticationError } from 'apollo-server-koa'

export const success = () => (entity) => {
  if (entity) {
    return entity
  }

  return null
}

export const notFound = (context) => (entity) => {
  if (entity) {
    return entity
  }

  context.response.status = 404
  return throw new UserInputError('404 User Not Found')
}

export const isSelf = (context) => (entity) => {
  if (entity) {
    if (context.request.header.authorization) {
      return entity
    }

    context.response.status = 401
    return throw new AuthenticationError('401 Not Authorized')
  }

  return null
}

export const authorOrAdmin = (context) => (entity) => {
  if (entity) {
    const { Authorization } = context.services
    const user = Authorization.user
    const isAuthor = user && entity[0] && entity[0]._id.equals(user.id)

    if (isAuthor) {
      return entity
    }

    context.response.status = 401
    return throw new AuthenticationError('401 Not Authorized')
  }

  return null
}
