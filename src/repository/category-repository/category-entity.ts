import mongoose from 'mongoose'

export class Category {
  _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()

  name: string = ''

  image: string = ''
}

export const CategorySchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  image: String,
})
