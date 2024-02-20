import express from 'express'
import auth from '../middleware/auth.js'
import { subscribe, unsubscribe } from '../controller/subscribeController.js'

const router = express.Router()

router.post('/', auth, subscribe)

router.delete('/', auth, unsubscribe)

export default router
