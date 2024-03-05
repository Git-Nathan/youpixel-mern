import SearchResult from '../models/SearchResult.js'

export const getSearchResult = async (req, res, next) => {
  const v = req.query.v || ''

  try {
    const result = await SearchResult.find({
      content: { $regex: v, $options: 'i' },
    })
      .sort({ __v: -1 })
      .limit(20)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export const addSearchResult = async (req, res, next) => {
  const v = req.query.v

  try {
    const result = await SearchResult.findOne({
      content: v,
    })
    if (result) {
      await SearchResult.findByIdAndUpdate(result._id, {
        $inc: { __v: 1 },
      })
    } else {
      const newSearchResult = new SearchResult({ content: v })
      newSearchResult.save()
    }
    res.status(200).json({ message: 'Added' })
  } catch (error) {
    res.status(500).send({ message: error })
  }
}
