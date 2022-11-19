import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Video from '../models/Video.js'

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT)
      res.status(200).json({ result: user, token })
    } else {
      const newUser = new User({
        ...req.body,
      })
      const savedUser = await newUser.save()
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
      res.status(200).json({ result: savedUser, token })
    }
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res) => {
  const userId = req.params.userId

  try {
    const user = await User.findById(userId)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const like = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.userId

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    })
    res.status(200).json({ message: 'Liked' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const dislike = async (req, res) => {
  const videoId = req.params.videoId
  const userId = req.userId

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    })
    res.status(200).json({ message: 'Disliked' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const sub = async (req, res, next) => {
  const userId = req.userId
  const channelId = req.params.channelId

  try {
    await User.findByIdAndUpdate(userId, {
      $push: { subscribedUsers: channelId },
    })
    await User.findByIdAndUpdate(channelId, {
      $inc: { subscribers: 1 },
    })
    res.status(200).json('Subscription successfull.')
  } catch (err) {
    next(err)
  }
}

export const unsub = async (req, res, next) => {
  const userId = req.userId
  const channelId = req.params.channelId

  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedUsers: channelId },
    })
    await User.findByIdAndUpdate(channelId, {
      $inc: { subscribers: -1 },
    })
    res.status(200).json('Unsubscription successfull.')
  } catch (err) {
    next(err)
  }
}
