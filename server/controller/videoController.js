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
