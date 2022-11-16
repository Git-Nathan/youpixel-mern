import express from 'express'
const router = express.Router()

import { getUser, googleAuth } from '../controller/userController.js'

router.get('/find/:userId', getUser)

router.post('/google', googleAuth)

export default router
