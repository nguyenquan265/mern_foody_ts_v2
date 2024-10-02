import { InferSchemaType, Schema, model } from 'mongoose'
import IMenuItem from '~/interfaces/menuItem.interface'

const menuItemSchema = new Schema<IMenuItem>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

type MenuItemType = InferSchemaType<typeof menuItemSchema>

export { menuItemSchema, MenuItemType }
