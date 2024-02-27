import express from 'express'
import auth from '../middleware/auth.js'
import { subscribe, unsubscribe } from '../controller/subscribeController.js'

const router = express.Router()

router.post('/:channelId', auth, subscribe)

router.delete('/:channelId', auth, unsubscribe)

export default router
