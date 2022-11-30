import mongoose from 'mongoose'

const WatchedVideosSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('WatchedVideos', WatchedVideosSchema)
