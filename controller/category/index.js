'use strict'

import CategoryModel from '../../models/category'
import ServerResponse from '../../common/serverResponse'
import formidable from 'formidable'
class Category {
    async addCategory(ctx, next) {
        let data = {}
        console.log(ctx.request.body.type)
        const { category_name, category_id = 0, type, sort = 0, show_home, expand = false } = ctx.request.body
        if (!category_name) {
            throw new Error('缺少category_name参数')
        }
        // } else if (!type) {
        //     throw new Error('缺少type参数')
        // }
        data = {
            category_id,
            category_name,
            sort,
            show_home,
            expand,
            type
        }
        try {
            const categoryEntity = await CategoryModel.create(data)
            let result = await categoryEntity.save()
            if (result) {
                return ServerResponse.SUCCESS(ctx, '添加分类成功', {})
            } else {
                return ServerResponse.ILLEGAL_ARGUMENT(ctx, '添加分类失败')
            }
        } catch (error) {
            return ServerResponse.ERROR(ctx, e, {})
        }
    }
    async updateCategory(ctx, next) {
        const tbData = ctx.request.body
        let result
        for (let prop in tbData) {
            try {
                result = await CategoryModel.find({ _id: tbData[prop]._id }).updateMany({
                    category_name: tbData[prop].category_name,
                    sort: tbData[prop].sort,
                    show_home: tbData[prop].show_home,
                    expand: tbData[prop].expand
                })
            } catch (e) {
                console.log(e)
                return ServerResponse.ERROR(ctx, e, {})
            }
        }
        if (result) {
            return ServerResponse.SUCCESS(ctx, '修改分类成功', {})
        } else {
            return ServerResponse.ILLEGAL_ARGUMENT(ctx, '修改分类失败')
        }
        // try {
        //     let result = await CategoryModel.find({ _id: _id }).update({ category_name, category_img })
        //     if (result) {
        //         return ServerResponse.SUCCESS(ctx, '修改分类成功', {})
        //     } else {
        //         return ServerResponse.ILLEGAL_ARGUMENT(ctx, '修改分类失败')
        //     }
        // } catch (e) {
        //     return ServerResponse.ERROR(ctx, e, {})
        // }

    }
    async deleteCategory(ctx, next) {
        const { _id } = ctx.request.body
        try {
            const isDelete = await CategoryModel.find({ category_id: _id })
            console.log(isDelete)
            if (isDelete.length == 0) {
                const result = await CategoryModel.remove({ _id: _id })
                if (result) {
                    return ServerResponse.SUCCESS(ctx, '删除分类成功', {})
                } else {
                    return ServerResponse.ILLEGAL_ARGUMENT(ctx, '删除分类失败')
                }
            } else {
                return ServerResponse.ILLEGAL_ARGUMENT(ctx, '删除分类失败，请先删除子分类')
            }
        } catch (e) {
            return ServerResponse.ERROR(ctx, e, {})
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