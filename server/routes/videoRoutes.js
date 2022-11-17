import express from 'express'
import {
  addVideo,
  fetchVideos,
  getVideo,
} from '../controller/videoController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/', fetchVideos)
router.get('/:id', getVideo)

router.post('/add', auth, addVideo)

export default router
