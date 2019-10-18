import _ from 'lodash'

export const intersection = (value, source) => {
  if (_.isArray(value)) {
    return source.filter(x => value.includes(x))
  }
}

export const difference = (value, source) => {
  if (_.isArray(value)) {
    return source.filter(x => !value.includes(x))
  }
}
