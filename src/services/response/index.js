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
  throw new Error('404 Not Found')
}

export const isSelf = (context) => (entity) => {
  if (entity) {
    if (context.request.header.authorization) {
      return entity
    }

    context.response.status = 401
    throw new Error('401 Not Authorized')
  }

  return null
}

export const authorOrAdmin = (context) => (entity) => {
  if (entity) {
    const { Authorization } = context.services
    const isAuthor = Authorization.user != null

    if (isAuthor) {
      return entity
    }

    context.response.status = 401
    throw new Error('401 Not Authorized')
  }

  return null
}
