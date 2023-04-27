import { Router } from 'express'
import { index } from '../controllers/profiles.js'

const router = Router()

router.get('/', index)

export { router }
