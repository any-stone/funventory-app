import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: String,
  platfrom: String,
  releaseYear: Number,
  genre: String,
  developer: String,
  status: String,
  reviews: {type: Schema.Types.ObjectId, ref: 'GameReview'},
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}