import mongoose from 'mongoose'

const Schema = mongoose.Schema

const gameSchema = new Schema({
  title: {type: String, required: true},
  platform: String,
  releaseYear: Number,
  genre: String,
  developer: String,
  status: {type: String, enum: ['Complete', 'Incomplete', 'In Progress']},
  reviews: {type: Schema.Types.ObjectId, ref: 'GameReview'},
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true
})

const Game = mongoose.model('Game', gameSchema)

export {
  Game
}