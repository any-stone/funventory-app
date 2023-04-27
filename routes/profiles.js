import { Router } from 'express'
import { index } from '../controllers/profiles.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, index)

export { router }
