import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodedData = jwt.verify(token, process.env.JWT)

    req.userId = decodedData?.id
    req.role = decodedData?.role
    next()
  } catch (error) {
    res.status(500).send({ message: error })
  }
}

export default auth
