import { Game } from '../models/game.js'
import { Review } from '../models/review.js'

function createReview(req, res) {
  let newReview
  Game.findById(req.params.gameId)
    .then(game => {
      newReview = new Review(req.body)
      newReview.game = game._id
      newReview.owner = req.user.profile._id
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
      console.log(err)
      res.redirect('/')
    })
}

function editReview(req, res) {
  Game.findById(req.params.gameId)
    .populate('reviews')
    .then((game) => {
      const review = game.reviews.find(review => review._id.equals(req.params.reviewId))

      if (!review) {
        return res.redirect(`/games/${req.params.gameId}`)
      }

      if (req.user.profile._id.equals(review.owner)) {
        res.render('reviews/edit', {
          game,
          review,
          title: 'Edit Review'
        })
      } else {
        res.redirect(`/games/${req.params.gameId}`)
      }
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
}


function updateReview(req, res) {
  Game.findById(req.params.gameId)
    .then((game) => {
      const reviewIndex = game.reviews.findIndex((reviewId) => reviewId.equals(req.params.reviewId))

      if (reviewIndex === -1) {
        return res.redirect(`/games/${req.params.gameId}`)
      }

      Review.findById(req.params.reviewId)
        .then((review) => {
          if (req.user.profile._id.equals(review.owner)) {
            review.text = req.body.text
            review.rating = req.body.rating
            review.save()
              .then(() => res.redirect(`/games/${req.params.gameId}`))
              .catch((err) => {
                console.log(err)
                res.redirect(`/games/${req.params.gameId}`)
              })
          } else {
            res.redirect(`/games/${req.params.gameId}`)
          }
        })
        .catch((err) => {
          console.log(err)
          res.redirect(`/games/${req.params.gameId}`)
        });
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
}

function deleteReview(req, res) {
  Review.findOneAndDelete({ _id: req.params.reviewId, owner: req.user.profile._id })
    .then((deletedReview) => {
      if (deletedReview) {
        Game.findByIdAndUpdate(
          req.params.gameId,
          { $pull: { reviews: req.params.reviewId } },
          { new: true, useFindAndModify: false }
        )
          .then(() => res.redirect(`/games/${req.params.gameId}`))
          .catch((err) => {
            console.log(err)
            res.redirect(`/games/${req.params.gameId}`)
          })
      } else {
        res.redirect(`/games/${req.params.gameId}`)
      }
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/')
    })
}


export {
  createReview,
  editReview,
  updateReview,
  deleteReview,
}