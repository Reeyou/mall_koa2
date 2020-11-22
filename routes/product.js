const router = require('koa-router')()
import product from '../controller/product/product'
import Category from '../controller/category'


router.prefix('/admin')

router.post('/addProduct', product.addProduct)

router.get('/getProductList', product.getProductList)

router.get('/getProduct', product.getProduct)

router.post('/createSku', product.createSku)

router.get('/getSku', product.getSku)

router.post('/addCategory', Category.addCategory)

router.post('/updateCategory', Category.updateCategory)

router.post('/deleteCategory', Category.deleteCategory)

router.get('/getCategoryList', Category.getCategoryList)



module.exports = router