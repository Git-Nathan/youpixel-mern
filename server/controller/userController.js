import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT)

      res.status(200).json({ data: user, token })
    } else {
      const newUser = new User({
        ...req.body,
      })
      const savedUser = await newUser.save()
      const token = jwt.sign(
        { id: savedUser._id, role: savedUser.role },
        process.env.JWT,
      )
      res.status(200).json({ data: savedUser, token })
    }
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.userId)
  try {
    const user = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: 'subscribes',
          localField: '_id',
          foreignField: 'channelId',
          as: 'subscriber',
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          picture: 1,
          createdAt: 1,
          updatedAt: 1,
          numOfSubscriber: {
            $cond: {
              if: {
                $isArray: '$subscriber',
              },
              then: {
                $size: '$subscriber',
              },
              else: 0,
            },
          },
        },
      },
    ])

    res.status(200).json({ data: user[0] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const sub = async (req, res, next) => {
  const userId = req.userId
  const channelId = req.params.channelId
  const objectUserId = mongoose.Types.ObjectId(req.userId)

  try {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { subscribedUsers: channelId },
    })
    await User.findByIdAndUpdate(channelId, {
      $addToSet: { subscribers: userId },
    })

    const updatedUser = await User.findById(userId)

    const subscribedUsers = await User.aggregate([
      { $match: { _id: objectUserId } },
      {
        $unwind: '$subscribedUsers',
      },
      { $addFields: { userObjectId: { $toObjectId: '$subscribedUsers' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjectId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $project: {
          userInfo: 1,
        },
      },
      {
        $unwind: '$userInfo',
      },
      { $replaceRoot: { newRoot: '$userInfo' } },
      {
        $project: {
          name: 1,
          picture: 1,
        },
      },
    ])

    res.status(200).json({ updatedUser, subscribedUsers })
  } catch (err) {
    next(err)
  }
}

export const unsub = async (req, res, next) => {
  const userId = req.userId
  const channelId = req.params.channelId
  const objectUserId = mongoose.Types.ObjectId(req.userId)

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedUsers: channelId },
    })
    await User.findByIdAndUpdate(channelId, {
      $pull: { subscribers: userId },
    })

    const updatedUser = await User.findById(userId)

    const subscribedUsers = await User.aggregate([
      { $match: { _id: objectUserId } },
      {
        $unwind: '$subscribedUsers',
      },
      { $addFields: { userObjectId: { $toObjectId: '$subscribedUsers' } } },
      {
        $lookup: {
          from: 'users',
          localField: 'userObjectId',
          foreignField: '_id',
          as: 'userInfo',
        },
      },
      {
        $project: {
          userInfo: 1,
        },
      },
      {
        $unwind: '$userInfo',
      },
      { $replaceRoot: { newRoot: '$userInfo' } },
      {
        $project: {
          name: 1,
          picture: 1,
        },
      },
    ])

    res.status(200).json({ updatedUser, subscribedUsers })
  } catch (err) {
    next(err)
  }
}

export const getLiked = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.userId)
  const { page } = req.query

  try {
    const startIndex = (Number(page) - 1) * 20
    const total = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: '$likedVideos',
      },
      { $replaceRoot: { newRoot: '$likedVideos' } },
      {
        $sort: { updatedAt: -1 },
      },
      { $addFields: { videoObjectId: { $toObjectId: '$videoId' } } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoObjectId',
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

    const likedVideos = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: '$likedVideos',
      },
      { $replaceRoot: { newRoot: '$likedVideos' } },
      {
        $sort: { updatedAt: -1 },
      },
      { $addFields: { videoObjectId: { $toObjectId: '$videoId' } } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoObjectId',
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
          'userInfo.likedVideos': 0,
          'userInfo.subscribedUsers': 0,
          'userInfo.updatedAt': 0,
          'userInfo.watchedVideos': 0,
          'userInfo.__v': 0,
          'userInfo.subscribers': 0,
        },
      },
    ])

    res.status(200).json({
      data: likedVideos,
      numberOfPages: Math.ceil(total?.count ? total[0].count / 20 : 1),
      total: total?.count ? total[0].count : 0,
    })
  } catch (err) {
    next(err)
  }
}
