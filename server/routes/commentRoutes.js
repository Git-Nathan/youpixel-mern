import express from 'express'
import {
  addComment,
  deleteComment,
  getComment,
  getComments,
} from '../controller/commentController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.delete('/delete/:commentId', auth, deleteComment)

router.post('/add/:videoId', auth, addComment)

router.get('/:videoId', getComments)
router.get('/get/:commentId', getComment)

export default router
