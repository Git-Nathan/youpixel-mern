import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    picture: {
      type: String,
    },
    watchedVideos: {
      type: [
        {
          type: new mongoose.Schema(
            {
              videoId: { type: mongoose.Types.ObjectId, unique: true },
            },
            { timestamps: true },
          ),
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', UserSchema)
