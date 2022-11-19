import express from 'express'
const router = express.Router()

import {
  dislike,
  getUser,
  googleAuth,
  like,
  sub,
  unsub,
} from '../controller/userController.js'
import auth from '../middleware/auth.js'

router.get('/find/:userId', getUser)

router.post('/google', googleAuth)
router.patch('/like/:videoId', auth, like)
router.patch('/dislike/:videoId', auth, dislike)
router.patch('/sub/:channelId', auth, sub)
router.patch('/unsub/:channelId', auth, unsub)

export default router
