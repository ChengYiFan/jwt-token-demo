const Koa = require('koa');
const bodyParser = require('koa-bodyparser'); // 请求解析的中间件
const nunjucks = require('koa-nunjucks-2');  // nunjucks JS模板引擎
const staticFiles = require('koa-static');   // 处理静态资源的中间件
const path = require('path');

const app = new Koa();
const router = require('./router')

// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")))

// 使用bodyParser解析请求体
app.use(bodyParser());

app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

// 注册路由
router(app);

// 启动服务器
app.listen(3000, () => {
  console.log('Server started on port 3000');
});