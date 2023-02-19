import express, { Router } from 'express'
import {
  addCategoryFn,
  delCategoryFn,
  getCategoryFn,
  setCategoryFn,
  addGoodsFn,
  getGoodsListFn,
  setGoodsFn,
  takeOffGoodsFn,
  delGoodsFn,
} from '../router-handler/goods'

// 解析表单数据 form-data
import multer from 'multer'

// 上传商品图片
const storage = multer.diskStorage({
  //存储的位置 public在根目录下
  destination(req, file, cb) {
    cb(null, 'public/goods/')
  },
  //图片名字的确定 multer默认帮我们取一个没有扩展名的图片名，因此需要我们自己定义给图片命名
  filename(req, file, cb) {
    cb(null, 'img' + file.originalname)
  },
})
// 创建一个multer实例
const upload = multer({ storage })

const router: Router = express.Router()

router.post('/addcategory', addCategoryFn)

router.get('/getcategory', getCategoryFn)

router.put('/setcategory', setCategoryFn)

router.post('/delcategory', delCategoryFn)

router.post('/addgoods', upload.single('pic'), addGoodsFn)

router.get('/getgoods', getGoodsListFn)

router.post('/setgoods', upload.single('pic'), setGoodsFn)

router.post('/takeoffgoods', takeOffGoodsFn)

router.post('/delgoods', delGoodsFn)

export default router
