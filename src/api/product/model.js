import mongoose, { Schema } from 'mongoose'

const model = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    barcode: {
      type: String
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: false
  }
)

model.methods = {
  view (full) {
    const view = {
      id: this.id,
      name: this.name,
      description: this.description,
      barcode: this.barcode,
      price: this.price
    }

    return full ? {
      ...view
    } : view
  }
}

const product = mongoose.model('Product', model)

export const schema = product.schema
export default product
