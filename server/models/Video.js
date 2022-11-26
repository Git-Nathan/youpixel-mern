import mongoose from 'mongoose'

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true },
)

export default mongoose.model('Video', VideoSchema)
