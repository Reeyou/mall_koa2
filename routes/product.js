const router = require('koa-router')()
import Product from '../controller/product/product'


router.prefix('/admin')

router.post('/addProduct', Product.addProduct)

router.get('/getProductList', Product.getProductList)
router.get('/test', Product.test)

module.exports = router