import { Router } from 'express'
import * as gamesCtrl from '../controllers/games.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', gamesCtrl.index)
router.get('/:gameId', gamesCtrl.show)
router.get("/:gameId/edit", isLoggedIn, gamesCtrl.edit)

router.post('/', isLoggedIn, gamesCtrl.create)

router.put('/:gameId', isLoggedIn, gamesCtrl.update)

router.delete('/:gameId', isLoggedIn, gamesCtrl.delete)

export {
  router
}