import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  text: {type: String, required: true},
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}