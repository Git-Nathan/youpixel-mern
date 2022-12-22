import mongoose from 'mongoose'

const ReportedCommentSchema = new mongoose.Schema(
  {
    commentId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    reportUserId: {
      type: String,
      required: true,
    },
    reportContent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('ReportedComment', ReportedCommentSchema)
