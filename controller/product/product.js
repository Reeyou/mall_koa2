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
  // 添加sku
  async createSku(ctx, next) {
    let code, msg, data
    const { skuList, spuId } = ctx.request.body
    const skuData = {
      spuId,
      skuList
    }
    let spuResult = await productSkuModel.find({spuId: spuId})
    if(spuResult) {
      let removeResult = await productSkuModel.remove({ spuId: spuId})
      if(removeResult) {
        console.log('删除成功')
      }
    }
    const productSkuEntity = await productSkuModel.create(skuData)
    let result = await productSkuEntity.save()
    data = await productSkuModel.find({spuId: spuId})
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
  // 添加商品
  async addProduct(ctx, next) {
    const form = new formidable.IncomingForm()
    form.parse(ctx.req, async (err, fields, files) => {
      if (err) {
        console.log(err)
        ctx.response.body = {
          code: 0,
          msg: err
        }
        return
      }
      switch (fields) {
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
      const skuData = {
        skuList: fields.skuList
      }

      const spuData = {
        skuId: fields.skuId,
        categoryId: fields.categoryId,
        name: fields.name,
        desc: fields.desc,
        pic: fields.pic,
        detailPic: fields.detailPic
      }
      try {
        // const productSkuEntity = await productSkuModel.create(skuData)
        const productSpuEntity = await productSpuModel.create(spuData)
        // await productSkuEntity.save()
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
    form.parse(ctx.req, async (err, fields, files) => {
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