import express, { Router } from 'express'
import { addCategoryFn, delCategoryFn, getCategoryFn, setCategoryFn } from '../router-handler/goods'

const router: Router = express.Router()

router.post('/addcategory', addCategoryFn)

router.get('/getcategory', getCategoryFn)

router.put('/setcategory', setCategoryFn)

router.post('/delcategory', delCategoryFn)

export default router
