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

export const getNumOfLikes = async (req, res) => {
  const videoId = mongoose.Types.ObjectId(req.params.videoId)

  try {
    const liked = await Like.countDocuments({
      videoId,
      isLike: true,
    })

    const disliked = await Like.countDocuments({
      videoId,
      isLike: false,
    })

    res.status(200).json({
      data: {
        liked,
        disliked,
      },
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getLiked = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.userId)
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Like.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'liked',
        },
      },
      {
        $unwind: '$liked',
      },
      { $replaceRoot: { newRoot: '$liked' } },
      {
        $count: 'count',
      },
    ])

    console.log('total', total)

    const likedVideos = await Like.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoId',
          foreignField: '_id',
          as: 'liked',
        },
      },
      {
        $unwind: '$liked',
      },
      { $replaceRoot: { newRoot: '$liked' } },
      {
        $project: {
          status: 0,
          videoPath: 0,
          videoUrl: 0,
          likes: 0,
          __v: 0,
          dislikes: 0,
        },
      },
      { $skip: startIndex },
      { $limit: 20 },
      { $addFields: { userObjectId: { $toObjectId: '$userId' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjectId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $unwind: '$userInfo',
      },
      {
        $project: {
          'userInfo.createdAt': 0,
          'userInfo.email': 0,
          'userInfo.updatedAt': 0,
          'userInfo.watchedVideos': 0,
          'userInfo.__v': 0,
        },
      },
    ])

    res.status(200).json({
      data: likedVideos,
      numberOfPages: Math.ceil(total?.count ? total[0].count / 20 : 1),
      total: total[0]?.count ? total[0].count : 0,
    })
  } catch (err) {
    next(err)
  }
}
