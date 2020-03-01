const router = require('koa-router')()
import Product from '../controller/product/product'
import Category from '../controller/category'


router.prefix('/admin')

router.post('/addProduct', Product.addProduct)

router.get('/getProductList', Product.getProductList)

router.post('/createSku', Product.createSku)

router.post('/addCategory', Category.addCategory)

router.get('/getCategoryList', Category.getCategoryList)



module.exports = router