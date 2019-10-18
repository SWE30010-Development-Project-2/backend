import _ from 'lodash'
import Transaction from './model'
import { notFound } from '../../services/response'
import { difference } from '../../services/lodash'

export default {
  Query: {
    transactions: (parent, args, context) => {
      return Transaction.find({})
        .populate('employee products')
        .then(transactions => transactions.map((transaction) => transaction.view(true)))
        .catch(error => console.log(error))
    },
    transaction: (parent, args, context) => {
      return Transaction.findById(args.id)
        .populate('employee products')
        .then(notFound(context))
        .then(transaction => transaction.view(true))
        .catch(error => throw error)
    }
  },
  Mutation: {
    addTransaction: (parent, args) => {
      return new Transaction(args).save()
        .then(transaction => Transaction.findById(transaction.id)
          .populate('employee products'))
        .catch(error => throw error)
    },
    updateTransaction: (parent, args, context) => {
      return Transaction.findById(args.id)
        .populate('employee products')
        .then(notFound(context))
        .then(transaction => _.mergeWith(transaction, args, difference).save())
        .then(transaction => Transaction.findById(transaction.id).populate('employee products'))
        .then(transaction => transaction.view(true))
        .catch(error => throw error)
    },
    removeTransaction: (parent, args, context) => {
      return Transaction.findById(args.id)
        .populate('employee products')
        .then(notFound(context))
        .then(transaction => transaction.remove())
        .catch(error => throw error)
    }
  }
}
