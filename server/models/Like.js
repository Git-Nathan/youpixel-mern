import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: 'videos',
      required: true,
    },
    isLike: {
      type: Boolean,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Like', LikeSchema)
