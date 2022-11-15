import express from 'express'
import { addVideo } from '../controller/videoController.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

router.post('/add', verifyToken, addVideo)

export default router
