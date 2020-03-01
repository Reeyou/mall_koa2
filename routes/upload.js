const router = require('koa-router')()
const fs = require('fs')
const path = require('path');

router.post('/upload', async(ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  const extension_name = `/${new Date().getTime()}.jpg`
  let filePath = path.join(__dirname, '../public/images/') + extension_name;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  ctx.response.body = {
    code: 200,
    msg: "上传成功",
    // data: "http://106.54.44.253:3000/images" + extension_name
    data: "http://localhost:3000/images" + extension_name
  };
})

module.exports = router