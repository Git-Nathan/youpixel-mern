import Comment from '../models/Comment.js'

export const addComment = async (req, res, next) => {
  const userId = req.userId
  const { videoId } = req.params
  const { comment } = req.body
  const newComment = new Comment({ userId, videoId, desc: comment })

  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (err) {
    next(err)
  }
}

export const getComments = async (req, res, next) => {
  const { videoId } = req.params

  try {
    const comments = await Comment.find({ videoId }).sort({ createdAt: -1 })
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req, res, next) => {
  const { commentId } = req.params
  const userId = req.userId

  try {
    const comment = await Comment.findById(commentId)
    if (userId === comment.userId) {
      await Comment.findByIdAndDelete(commentId)
      res.status(200).json({ message: 'delete successfully' })
    } else {
      return next(createError(403, 'You can only delete your comment!'))
    }
  } catch (err) {
    next(err)
  }
}
