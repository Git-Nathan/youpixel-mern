import express from 'express'
import { googleAuth } from '../controller/authController'

const router = express.Router()

router.post('/google', googleAuth)

export default router
