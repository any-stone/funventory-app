import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:gameId', reviewsCtrl.createReview)
router.get('/:gameId/reviews/:reviewId/edit', isLoggedIn, reviewsCtrl.editReview)

router.post('/:gameId/reviews', isLoggedIn, reviewsCtrl.createReview)

router.put('/:gameId/reviews/:reviewId', isLoggedIn, reviewsCtrl.updateReview) 

router.delete('/:gameId/reviews/:reviewId', isLoggedIn, reviewsCtrl.deleteReview)


export {
  router,
}