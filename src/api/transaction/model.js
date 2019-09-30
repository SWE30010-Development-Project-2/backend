import mongoose, { Schema } from 'mongoose'

const model = new Schema(
  {
    employee: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    customer: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true
    },
    products: {
      type: [Schema.ObjectId],
      ref: 'Product',
      required: true
    }
  },
  {
    timestamps: true
  }
)

model.methods = {
  view (full) {
    const view = {
      id: this.id,
      employee: this.employee.view(false),
      customer: this.customer.view(false),
      products: this.products.map(product => product.view(true)),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
    } : view
  }
}

const transaction = mongoose.model('Transaction', model)

export const schema = transaction.schema
export default transaction
