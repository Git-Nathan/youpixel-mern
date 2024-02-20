import express from 'express'
import {
  dislike,
  getStatus,
  like,
  unlike,
} from '../controller/likeController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/like/:videoId', auth, like)
router.post('/unlike/:videoId', auth, unlike)
router.post('/dislike/:videoId', auth, dislike)

router.get('/status/:videoId', auth, getStatus)

export default router