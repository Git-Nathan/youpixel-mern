import express from 'express'
import auth from '../middleware/auth.js'
import {
  getSubscribeStatus,
  getSubscribedVideos,
  subscribe,
  unsubscribe,
} from '../controller/subscribeController.js'

const router = express.Router()

router.post('/:channelId', auth, subscribe)

router.delete('/:channelId', auth, unsubscribe)

router.get('/subscribed', auth, getSubscribedVideos)
router.get('/:channelId', auth, getSubscribeStatus)

export default router
