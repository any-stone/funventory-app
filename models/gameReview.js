import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameReviewSchema = new Schema({
  rating: {type: Number, min: 1, max: 5, default: 5},
  text: {type: String, required: true},
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const GameReview = mongoose.model('GameReview', gameReviewSchema)

export {
  GameReview
}