'use strict'


import productSpuModel from '../../models/product_spu'
import productSkuModel from '../../models/product_sku'
import formidable from 'formidable'

class Product {
  constructor(props) {

  }
  // 添加sku
  async createSku(ctx, next) {
    let code, msg, data
    const { skuList, spuId } = ctx.request.body
    const skuData = {
      spuId,
      skuList
    }
    const productSkuEntity = await productSkuModel.create(skuData)
    let result = await productSkuEntity.save()
    data = await productSkuModel.find({ spuId: spuId })
    if (!result) {
      ctx.response.body = {
        code: 0,
        msg: '添加sku失败'
      }
    } else {
      ctx.response.body = {
        code: 200,
        msg: '添加sku成功',
        data
      }
    }
  }
  async getSku(ctx, next) {
    let data, code, msg
    const { spuId } = ctx.request.query

    try {
      data = await productSkuModel.find({ spuId: spuId })
      code = 200
      msg = '获取sku成功'
    } catch (error) {
      code = 0
      msg = '获取sku失败'
    }

    ctx.response.body = {
      code,
      msg,
      data
    }
  }
  // 添加商品
  async addProduct(ctx, next) {
    console.log(ctx.request.body) 
    const { spuId, categoryId, name, desc, pic, detailPic } = ctx.request.body
    const spuData = {
      spuId,
      categoryId,
      name,
      desc,
      pic,
      detailPic
    }
    try {
      const productSpuEntity = await productSpuModel.create(spuData)
      let result = await productSpuEntity.save()
      console.log(result)
      if (result) {
        ctx.response.body = {
          code: 200,
          msg: `添加商品成功`,
        }
      } else {
        ctx.response.body = {
          code: 200,
          msg: `添加商品失败`,
        }
      }
    } catch (error) {
      console.log(error.message)
      ctx.response.body = {
        code: 0,
        msg: `添加商品失败,${error}`,
      }
    }
  }
  async getProduct(ctx, next) {
    const {spuId} = ctx.request.query
      try {
       let data = await productSpuModel.find({spuId})
        ctx.response.body = {
          code: 200,
          msg: '获取商品成功',
          data
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
    // })
  }
  // 获取商品列表
  async getProductList(ctx, next) {
    // const form = new formidable.IncomingForm()
    // form.parse(ctx.req, async (err, fields, files) => {
    //   if (err) {
    //     ctx.response.body = {
    //       code: 0,
    //       message: `获取商品列表失败${err}`
    //     }
    //     return
    //   }
      const pageSize = 1, limit = 10 
      try {
       let productList = await productSpuModel.find()
          .skip((pageSize - 1) * limit)
          .limit(Number(limit))
        let total = await productSpuModel.count()
        ctx.response.body = {
          code: 200,
          msg: '获取商品列表成功',
          data: {
            list: productList,
            total
          }
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
    // })
  }
}

export default new Product()