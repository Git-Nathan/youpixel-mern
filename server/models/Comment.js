import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    videoId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Comment', CommentSchema)
