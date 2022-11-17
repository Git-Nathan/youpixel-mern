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
    const videos = await Video.find()

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
