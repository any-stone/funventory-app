import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameReviewSchema = new Schema({
  rating: Number, //add min: 1, max 5
  text: String, //add required
  game: {type: Schema.Types.ObjectId, ref: 'Game'},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const GameReview = mongoose.model('GameReview', gameReviewSchema)

export {
  GameReview
}