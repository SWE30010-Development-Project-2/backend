import _ from 'lodash'
import Transaction from './model'
import { notFound } from '../../services/response'

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
          .populate('employee customer products'))
        .catch(error => throw error)
    },
    updateTransaction: (parent, args, context) => {
      return Transaction.findById(args.id)
        .populate('employee products')
        .then(notFound(context))
        .then(transaction => transaction ? _.merge(transaction, args).save() : null)
        .then(transaction => transaction ? transaction.view(true) : null)
    },
    removeTransaction: (parent, args, context) => {
      return Transaction.findById(args.id)
        .populate('employee products')
        .then(notFound(context))
        .then(transaction => transaction ? transaction.remove() : null)
    }
  }
}
