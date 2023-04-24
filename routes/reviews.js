import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'

const router = Router()

router.get('/:gameId', reviewsCtrl.createReview)
router.post('/:gameId/reviews', reviewsCtrl.createReview);

export {
  router
}