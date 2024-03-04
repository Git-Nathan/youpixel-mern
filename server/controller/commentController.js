import mongoose from 'mongoose'
import Comment from '../models/Comment.js'

export const addComment = async (req, res, next) => {
  const userObjectId = mongoose.Types.ObjectId(req.userId)
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const { comment } = req.body
  const newComment = new Comment({
    userId: userObjectId,
    videoId,
    desc: comment,
  })

  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getComments = async (req, res, next) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Comment.find({ videoId }).countDocuments({})

    const comments = await Comment.aggregate([
      { $match: { videoId: videoId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: {
          path: '$userInfo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          'userInfo.watchedVideos': 0,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: startIndex },
      { $limit: 20 },
    ])

    res
      .status(200)
      .json({ data: comments, numberOfPages: Math.ceil(total / 20), total })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteComment = async (req, res, next) => {
  const commentId = mongoose.Types.ObjectId(req.params.commentId)
  const userObjectId = mongoose.Types.ObjectId(req.userId)

  try {
    const comment = await Comment.findById(commentId)
    if (userObjectId.equals(comment.userId)) {
      await Comment.findByIdAndDelete(commentId)
      res.status(200).json({ message: 'delete successfully' })
    } else {
      res.status(404).json({ message: 'You can only delete your comment!' })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
