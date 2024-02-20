import express from 'express'
import {
  addSearchResult,
  getSearchResult,
} from '../controller/searchController.js'

const router = express.Router()

router.post('/', addSearchResult)

router.get('/', getSearchResult)

export default router
