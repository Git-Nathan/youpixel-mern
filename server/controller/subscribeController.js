import mongoose from 'mongoose'
import Subscribe from '../models/Subscribe.js'

export const subscribe = async (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.userId)
  const channelId = mongoose.Types.ObjectId(req.params.channelId)

  try {
    const existed = await Subscribe.countDocuments({
      userId: userObjectId,
      channelId,
    })

    if (existed === 0) {
      const subscribe = new Subscribe({
        userId: userObjectId,
        channelId,
      })

      const savedSubscribe = await subscribe.save()
      res.status(200).json({ data: savedSubscribe })
    } else {
      res.status(200).json({ message: 'Existed' })
    }
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const unsubscribe = async (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.userId)
  const channelId = mongoose.Types.ObjectId(req.params.channelId)

  try {
    await Subscribe.deleteMany({
      userId: userObjectId,
      channelId,
    })

    res.status(200).json({ message: 'Unsubscribe successfully' })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const getSubscribeStatus = async (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.userId)
  const channelId = mongoose.Types.ObjectId(req.params.channelId)

  try {
    const existed = await Subscribe.countDocuments({
      userId: userObjectId,
      channelId,
    })

    if (existed === 0) {
      res.status(200).json({
        data: {
          status: false,
        },
      })
    } else {
      res.status(200).json({
        data: {
          status: true,
        },
      })
    }
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const getSubscribedVideos = async (req, res) => {
  const userObjectId = mongoose.Types.ObjectId(req.userId)
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await Subscribe.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'channelId',
          foreignField: 'userId',
          as: 'videos',
        },
      },
      {
        $unwind: {
          path: '$videos',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceRoot: {
          newRoot: '$videos',
        },
      },
      {
        $count: 'count',
      },
    ])

    const subscribedVideos = await Subscribe.aggregate([
      {
        $match: { userId: userObjectId },
      },
      {
        $lookup: {
          from: 'videos',
          localField: 'channelId',
          foreignField: 'userId',
          as: 'videos',
        },
      },
      {
        $unwind: {
          path: '$videos',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $replaceRoot: {
          newRoot: '$videos',
        },
      },
      { $sort: { createdAt: -1 } },
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
      data: subscribedVideos,
      numberOfPages: Math.ceil(total?.count ? total[0].count / 20 : 1),
      total: total[0]?.count ? total[0].count : 0,
    })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}
