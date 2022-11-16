import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'

export const googleAuth = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT)
      res.status(200).json({ result: user, token })
    } else {
      const newUser = new UserModel({
        ...req.body,
      })
      const savedUser = await newUser.save()
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
      res.status(200).json({ result: savedUser, token })
    }
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
