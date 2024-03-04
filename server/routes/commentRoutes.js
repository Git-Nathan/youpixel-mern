import express from 'express'
import {
  addComment,
  deleteComment,
  getComments,
} from '../controller/commentController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.delete('/:commentId', auth, deleteComment)

router.post('/:videoId', auth, addComment)

router.get('/:videoId', getComments)

export default router
