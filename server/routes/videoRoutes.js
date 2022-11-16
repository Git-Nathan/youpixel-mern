import express from 'express'
import { addVideo } from '../controller/videoController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/add', auth, addVideo)

export default router
