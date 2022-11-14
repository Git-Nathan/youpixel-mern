import express from 'express'
const router = express.Router()

import { googleAuth } from '../controller/authController.js'

router.post('/google', googleAuth)

export default router
