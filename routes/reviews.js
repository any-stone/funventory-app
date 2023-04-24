import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/:gameId', reviewsCtrl.createReview)
router.post('/:gameId/reviews', isLoggedIn, reviewsCtrl.createReview);

export {
  router,
}