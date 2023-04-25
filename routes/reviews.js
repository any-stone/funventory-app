import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:gameId', reviewsCtrl.createReview)
router.post('/:gameId/reviews', isLoggedIn, reviewsCtrl.createReview) //Refactor!!!
router.get('/:gameId/reviews/:reviewId/edit', isLoggedIn, reviewsCtrl.editReview) //Refactor!!!
router.put('/:gameId/reviews/:reviewId', isLoggedIn, reviewsCtrl.updateReview) //Refactor!!!
router.delete('/:gameId/reviews/:reviewId', isLoggedIn, reviewsCtrl.deleteReview)


export {
  router,
}