import express from 'express'
import {
  addSearchResult,
  getSearchResult,
} from '../controller/searchController.js'

const router = express.Router()

router.get('/get/:value', getSearchResult)
router.get('/add/:value', addSearchResult)

export default router
