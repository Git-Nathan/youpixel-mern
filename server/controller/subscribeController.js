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
