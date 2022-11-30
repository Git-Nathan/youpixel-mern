import WatchedVideos from '../models/WatchedVideos.js'

export const addWatchedVideo = async (req, res, next) => {
  const userId = req.userId
  const { videoId } = req.params

  try {
    const old = await WatchedVideos.findOne({ userId, videoId })
    if (old) {
      await WatchedVideos.findByIdAndUpdate(old._id, {
        $inc: { __v: 1 },
      })
    } else {
      const newItem = new WatchedVideos({ userId, videoId })
      newItem.save()
    }
    res.status(200).json({ message: 'added' })
  } catch (err) {
    next(err)
  }
}

export const getWatched = async (req, res, next) => {
  const userId = req.userId

  try {
    const watched = await WatchedVideos.aggregate([
      {
        $match: { userId },
      },
      {
        $sort: { updatedAt: -1 },
      },
      { $addFields: { videoObjectId: { $toObjectId: '$videoId' } } },
      {
        $lookup: {
          from: 'videos',
          localField: 'videoObjectId',
          foreignField: '_id',
          as: 'watched',
        },
      },
    ])

    res.status(200).json({ watched })
  } catch (err) {
    next(err)
  }
}
