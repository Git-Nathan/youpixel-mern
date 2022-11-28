import mongoose from 'mongoose'

const SearchResultSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    times: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
)

export default mongoose.model('SearchResult', SearchResultSchema)
