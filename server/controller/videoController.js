import Video from '../models/Video.js'

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.userId, ...req.body })

  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (err) {
    next(err)
  }
}

export const fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find({ status: 'approved' })

    res.status(200).json({ data: videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getVideo = async (req, res) => {
  const { id } = req.params

  try {
    const video = await Video.findById(id)

    res.status(200).json(video)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const addView = async (req, res) => {
  const { id } = req.params

  try {
    await Video.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    })
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getTopView = async (req, res) => {
  try {
    const videos = await Video.find({ status: 'approved' }).sort({ views: -1 })
    res.status(200).json({ videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideos = async (req, res) => {
  const { id } = req.query

  try {
    const videos = await Video.find({ userId: id, status: 'approved' })

    res.status(200).json({ videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideosPending = async (req, res) => {
  const { id } = req.query

  try {
    const videos = await Video.find({
      userId: id,
      status: ['pending', 'denied'],
    })

    res.status(200).json({ videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserVideosToApproval = async (req, res) => {
  try {
    const videos = await Video.find({
      status: 'pending',
    })

    res.status(200).json({ videos })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const approveVideo = async (req, res) => {
  const { videoId } = req.params

  try {
    if (req.body.role === 'admin') {
      await Video.findByIdAndUpdate(videoId, {
        status: 'approved',
      })
      res.status(200).json({ message: 'Approved' })
    } else {
      return next(createError(403, 'You not an admin!'))
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const denyVideo = async (req, res) => {
  const { videoId } = req.params

  try {
    if (req.body.role === 'admin') {
      await Video.findByIdAndUpdate(videoId, {
        status: 'denied',
      })
      res.status(200).json({ message: 'denied' })
    } else {
      return next(createError(403, 'You not an admin!'))
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const deleteVideo = async (req, res, next) => {
  const { videoId } = req.params
  const userId = req.userId

  try {
    const video = await Video.findById(videoId)
    if (userId === video.userId) {
      await Video.findByIdAndDelete(videoId)
      res.status(200).json({ message: 'delete successfully' })
    } else {
      return next(createError(403, 'You can only delete your video!'))
    }
  } catch (err) {
    next(err)
  }
}
