import express from 'express'
const router = express.Router()

import {
  getLiked,
  getUser,
  googleAuth,
  sub,
  unsub,
} from '../controller/userController.js'
import auth from '../middleware/auth.js'

router.post('/google', googleAuth)

router.patch('/sub/:channelId', auth, sub)
router.patch('/unsub/:channelId', auth, unsub)

router.get('/getLiked', auth, getLiked)
router.get('/:userId', getUser)

export default router
