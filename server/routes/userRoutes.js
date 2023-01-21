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
  undislike,
  unlike,
  unsub,
} from '../controller/userController.js'
import auth from '../middleware/auth.js'

router.post('/google', googleAuth)

router.patch('/watched/add/:videoId', auth, addWatchedVideo)
router.patch('/like/:videoId', auth, like)
router.patch('/unlike/:videoId', auth, unlike)
router.patch('/dislike/:videoId', auth, dislike)
router.patch('/undislike/:videoId', auth, undislike)
router.patch('/sub/:channelId', auth, sub)
router.patch('/unsub/:channelId', auth, unsub)

router.get('/find/:userId', getUser)
router.get('/getWatched', auth, getWatched)
router.get('/getLiked', auth, getLiked)

export default router
