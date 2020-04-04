const router = require('koa-router')()
import Product from '../controller/product/product'
import Category from '../controller/category'


router.prefix('/admin')

router.post('/addProduct', Product.addProduct)

router.get('/getProductList', Product.getProductList)

router.get('/getProduct', Product.getProduct)

router.post('/createSku', Product.createSku)

router.get('/getSku', Product.getSku)

router.post('/addCategory', Category.addCategory)

router.post('/updateCategory', Category.updateCategory)

router.post('/deleteCategory', Category.deleteCategory)

router.get('/getCategoryList', Category.getCategoryList) 



module.exports = router