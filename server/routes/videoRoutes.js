import express from 'express'
import {
  addVideo,
  addView,
  approveVideo,
  denyVideo,
  fetchVideos,
  getTopView,
  getUserVideos,
  getUserVideosPending,
  getUserVideosToApproval,
  getVideo,
} from '../controller/videoController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/approval/approve/:videoId', auth, approveVideo)
router.post('/approval/deny/:videoId', auth, denyVideo)
router.patch('/addview/:id', addView)
router.post('/add', auth, addVideo)

router.get('/author/pending', getUserVideosPending)
router.get('/author', getUserVideos)
router.get('/topview', getTopView)
router.get('/approval', getUserVideosToApproval)
router.get('/:id', getVideo)
router.get('/', fetchVideos)

export default router
