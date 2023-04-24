import { Review } from '../models/review.js'

function createReview(req, res) {
  Game.findById(req.params.gameId)
    .then(game => {
      const newReview = new Review(req.body)
      newReview.game = game._id;
      return newReview.save().then(() => game)
    })
    .then(game => {
      game.reviews.push(newReview);
      return game.save()
    })
    .then(() => {
      res.redirect(`/games/${req.params.gameId}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

export {
  createReview,
}