import Like from '../models/Like.js'
import mongoose from 'mongoose'

export const like = async (req, res) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const userObjectId = mongoose.Types.ObjectId(req.userId)

  try {
    const existed = await Like.countDocuments({
      userId: userObjectId,
      videoId,
    })

    if (existed === 0) {
      const like = new Like({
        userId: userObjectId,
        videoId,
        isLike: true,
      })

      const savedLike = await like.save()
      res.status(200).json({ data: savedLike })
    } else {
      await Like.findOneAndUpdate(
        {
          userId: userObjectId,
          videoId,
        },
        { $set: { isLike: true } },
      )

      res.status(200).json({ message: 'Liked' })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const unlike = async (req, res) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const userObjectId = mongoose.Types.ObjectId(req.userId)

  try {
    await Like.deleteMany({
      userId: userObjectId,
      videoId,
    })

    res.status(200).json({ message: 'Unliked' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const dislike = async (req, res) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const userObjectId = mongoose.Types.ObjectId(req.userId)

  try {
    const existed = await Like.countDocuments({
      userId: userObjectId,
      videoId,
    })

    if (existed === 0) {
      const like = new Like({
        userId: userObjectId,
        videoId,
        isLike: false,
      })

      const savedLike = await like.save()
      res.status(200).json({ data: savedLike })
    } else {
      await Like.findOneAndUpdate(
        {
          userId: userObjectId,
          videoId,
        },
        { $set: { isLike: false } },
      )

      res.status(200).json({ message: 'Disliked' })
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getStatus = async (req, res) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)
  const userObjectId = mongoose.Types.ObjectId(req.userId)

  try {
    const existed = await Like.findOne({
      userId: userObjectId,
      videoId,
    })

    res.status(200).json({ data: existed })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
