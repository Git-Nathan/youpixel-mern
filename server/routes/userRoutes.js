import express from 'express'
const router = express.Router()

import {
  addWatchedVideo,
  dislike,
  getLiked,
  getUser,
  getWatched,
  googleAuth,
  like,
  sub,
  unsub,
} from '../controller/userController.js'
import auth from '../middleware/auth.js'

router.get('/find/:userId', getUser)
router.get('/getLiked', auth, getLiked)
router.get('/getWatched', auth, getWatched)

router.post('/google', googleAuth)

router.patch('/watched/add/:videoId', auth, addWatchedVideo)
router.patch('/like/:videoId', auth, like)
router.patch('/dislike/:videoId', auth, dislike)
router.patch('/sub/:channelId', auth, sub)
router.patch('/unsub/:channelId', auth, unsub)

export default router
