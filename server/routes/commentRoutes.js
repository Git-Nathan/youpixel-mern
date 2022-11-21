import express from 'express'
import { addComment, getComments } from '../controller/commentController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.get('/:videoId', getComments)

router.post('/add/:videoId', auth, addComment)

export default router
