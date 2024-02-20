import mongoose from 'mongoose'

const SubscribeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    channelId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('Subscribe', SubscribeSchema)
