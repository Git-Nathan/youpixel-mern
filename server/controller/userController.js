import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'

export const googleAuth = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: '1h',
      })
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
