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
