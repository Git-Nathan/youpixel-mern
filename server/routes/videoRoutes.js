import express from 'express'
import {
  addVideo,
  addView,
  fetchVideos,
  getTopView,
  getUserVideos,
  getUserVideosPending,
  getVideo,
} from '../controller/videoController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/author/pending', getUserVideosPending)
router.get('/author', getUserVideos)
router.get('/topview', getTopView)
router.get('/:id', getVideo)
router.get('/', fetchVideos)

router.patch('/addview/:id', addView)
router.post('/add', auth, addVideo)

export default router
