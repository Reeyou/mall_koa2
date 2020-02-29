'use strict'


import productSpuModel from '../../models/product_spu'
import productSkuModel from '../../models/product_sku'
import formidable from 'formidable'

class Product {
  constructor(props) {

  }
  async test(ctx, next) {
    ctx.response.body = {
      code: 0,
      msg: 'test'
    }
  }
  // 添加商品
  async addProduct(ctx, next) {
    const form = new formidable.IncomingForm()
    form.parse(ctx.request, async (err, fields, files) => {
      if(err) {
        console.log(err)
        ctx.response.body = {
          code: 0,
          msg: err
        }
        return
      }
      switch(fields) {
        case !fields.name:
          throw new Error('必须填写商品名称');
          break;
        case !fields.desc:
          throw new Error('必须填写商品描述');
          break;
        case !fields.pic:
          throw new Error('必须添加商品主图');
          break;
        default:
          break;
      }
      const addSkuList = []
      fields.skuList.map((item,index) => {
        addSkuList.push({
          color: item.color,
          version: item.version,
          price: item.price,
          pics: item.pics
        })
      })
      const skuData = {
        id: fields.id,
        name: fields.name,
        spuId: fields.spuId,
        categoryId: fields.categoryId,
        skuList: addSkuList
      }
      
      const spuData = {
        id: fields.id,
        skuId: fields.skuId,
        categoryId: fields.categoryId,
        name: fields.name,
        desc: fields.desc,
        pic: fields.pic,
      }
      try {
        const productSkuEntity = await productSkuModel.create(skuData)
        const productSpuEntity = await productSpuModel.create(spuData)
        await productSkuEntity.save()
        await productSpuEntity.save()
      } catch (error) {
        console.log(error.message)
        ctx.response.body = {
          code: 0,
          msg: `添加商品失败,${error}`,
        }
      }
    })
  }
  // 获取商品列表
  async getProductList(ctx, next) {
    const form = new formidable.IncomingForm()
    form.parse(ctx.request, async(err, fields, files) => {
      if (err) {
        ctx.response.body = {
          code: 0,
          message: `获取商品列表失败${err}`
        }
        return
      }
      const { pageSize, limit = 10 } = fields
      try {
        productList = await productSpuModel.find()
          .skip((pageSize - 1) * limit)
          .limit(Number(limit))
        total = await productSpuModel.count()
        ctx.response.body = {
          code: 200,
          msg: '获取商品列表成功',
          productList,
          total
        }
      } catch (err) {
        console.log(err)
        ctx.response.body = {
					code: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				}
				return
      }
    })
  }
}

export default new Product()