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
      let data = {}
      const {categoryname,categoryImg = '', type, categoryId = ''} = ctx.request.body
      if(categoryId&&categoryImg) {
        data = {
          categoryId,
          categoryname,
          categoryImg,
          type
        }
      } else {
        data = {
          categoryId,
          categoryname,
          type
        }
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
  async updateCategory(ctx, next) {
    let code, msg, data
    const {_id, categoryname,categoryImg = ''} = ctx.request.body
    categoryImg ? categoryImg : ""
    try {
      let result = await CategoryModel.find({_id: _id}).update({categoryname, categoryImg})
      if(result) {
        code = 200
        msg = "修改成功"
        data = result
      } else {
        code = -1
        msg = "修改失败"
      }
    } catch (e) {
      code = -1
      msg = '操作失败'
    }
    ctx.response.body = {
      code,
      msg,
      data
    }
  }
  async deleteCategory(ctx, next) {
    let code, msg
    const {_id} = ctx.request.body
    try {
      const isDelete = await CategoryModel.find({categoryId: _id})
      console.log(isDelete)
      if(isDelete.length == 0) {
        const result = await CategoryModel.remove({_id:_id})
        if(result) {
          code = 200
          msg = "删除成功"
        } else {
          code = -1
          msg = "删除失败"
        }
      } else {
        code = -1
        msg = "请先删除子分类"
      }
    } catch (e) {
      console.log(e)
      code = -1
      msg = '操作失败'
    }
    ctx.response.body = {
      code,
      msg
    }
  }
  async getCategoryList(ctx, next) {
    let code, msg, list, total
    try {
      list = await CategoryModel.find({}, null, { lean: true })
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