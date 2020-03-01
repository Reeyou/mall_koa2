'use strict'

import CategoryModel from '../../models/category'
import formidable from 'formidable'
class Category {
  async addCategory(ctx, next) {
    // const form = new formidable.IncomingForm()
    // form.parse(ctx.req, async (err, fields, files) => {
      // if (err) {
      //   console.log(err)
      //   ctx.response.body = {
      //     code: 0,
      //     msg: err
      //   }
      //   return
      // }
      const {categoryname} = ctx.request.body
      const data = {
        categoryname
      }
      try {
        const categoryEntity = await CategoryModel.create(data)
        let result = await categoryEntity.save()
        if (result) {
          ctx.response.body = {
            code: 200,
            msg: `添加分类成功`,
          }
        } else {
          ctx.response.body = {
            code: 200,
            msg: `添加分类失败`,
          }
        }
      } catch (error) {
        ctx.response.body = {
          code: 0,
          msg: `添加分类失败,${error}`,
        }
      }
    // })
  }

  async getCategoryList(ctx, next) {
    const pageSize = 1, limit = 10
    let code, msg, list, total
    try {
      list = await CategoryModel.find({}, null, { lean: true })
        .skip((pageSize - 1) * limit)
        .limit(Number(limit))
      total = await CategoryModel.countDocuments()
      code = 200
      msg = '查找成功'
    } catch (e) {
      code = -1
      msg = '查找失败'
    }
    ctx.response.body = {
      code,
      msg,
      data: {
        list,
        total
      }
    }
  }
}

export default new Category()