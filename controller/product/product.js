'use strict'

import mongoose from 'mongoose'
import productSpuModel from '../../models/product_spu'
import productSkuModel from '../../models/product_sku'
import ServerResponse from '../../common/serverResponse'
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
        const {
            category_id,
            product_name,
            product_solgan,
            product_cacel,
            code,
            place,
            long,
            width,
            height,
            weight,
            logistics_type,
            logistics_value,
            saletime_type,
            saletime_value,
            img_list,
            detail,
            sku_list
        } = ctx.request.body
        const spuData = {
            category_id,
            product_name,
            product_solgan,
            product_cacel,
            code,
            place,
            long,
            width,
            height,
            weight,
            logistics_type,
            logistics_value,
            saletime_type,
            saletime_value,
            img_list,
            detail,
            sku_list
        }
        let sku_result, spu_id = mongoose.Types.ObjectId();
        console.log(ctx.request.body)
        for (var i = 0; i < sku_list.length; i++) {


            const {
                color,
                size,
                version,
                img_list
            } = sku_list[i]
            const skuData = {
                spu_id,
                color,
                size,
                version,
                img_list
            }
            try {
                const productSkuEntity = await productSkuModel.create(skuData)
                sku_result = await productSkuEntity.save()
            } catch (e) {
                return ServerResponse.ERROR(ctx, e, {})
            }

        }
        try {
            const productSpuEntity = await productSpuModel.create(spuData)
            let spu_result = await productSpuEntity.save()
            if (spu_result && sku_result) {
                return ServerResponse.SUCCESS(ctx, '添加商品成功', {})
            } else {
                return ServerResponse.ILLEGAL_ARGUMENT(ctx, '添加商品失败')
            }
        } catch (e) {
            return ServerResponse.ERROR(ctx, e, {})
        }
    }
    async getProduct(ctx, next) {
            const { spuId } = ctx.request.query
            try {
                let data = await productSpuModel.find({ spuId })
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
        const pageSize = 1,
            limit = 10
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