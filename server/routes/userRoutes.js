import express from 'express'
const router = express.Router()

import { googleAuth } from '../controller/userController.js'

router.post('/google', googleAuth)

export default router
