import { Game } from '../models/game.js'
import { Review } from '../models/review.js'

function createReview(req, res) {
  let newReview;
  Game.findById(req.params.gameId)
    .then(game => {
      newReview = new Review(req.body)
      newReview.game = game._id;
      return newReview.save().then(() => game)
    })
    .then(game => {
      game.reviews.push(newReview)
      return game.save()
    })
    .then(() => {
      res.redirect(`/games/${req.params.gameId}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/')
    })
}

function editReview(req, res) {
  Game.findById(req.params.gameId)
    .then((game) => {
      const review = game.reviews.id(req.params.reviewId)

      if (!review) {
        return res.redirect(`/games/${req.params.gameId}`)
      }

      if (req.user._id.equals(review.user)) {
        res.render('reviews/edit', { game, review })
      } else {
        res.redirect(`/games/${req.params.gameId}`)
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/games/${req.params.gameId}`)
    });
}

function updateReview(req, res) {
  Game.findById(req.params.gameId)
    .then((game) => {
      const review = game.reviews.id(req.params.reviewId)

      if (!review) {
        return res.redirect(`/games/${req.params.gameId}`)
      }

      if (req.user._id.equals(review.user)) {
        review.text = req.body.text;
        review.rating = req.body.rating;
        game.save()
          .then(() => res.redirect(`/games/${req.params.gameId}`))
          .catch((err) => {
            console.log(err);
            res.redirect(`/games/${req.params.gameId}`)
          });
      } else {
        res.redirect(`/games/${req.params.gameId}`)
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/games/${req.params.gameId}`)
    });
}

export {
  createReview,
  editReview,
  updateReview,
}