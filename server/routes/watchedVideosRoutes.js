import express from 'express'
import { addWatchedVideo, getWatched } from '../controller/watchedVideosController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/get', auth, getWatched)

router.patch('/add/:videoId', auth, addWatchedVideo)

export default router
