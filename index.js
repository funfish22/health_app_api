const koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

const app = new koa();
const router = new Router();

app.use(bodyParser());

const lists = require('./routes/api/lists');

router.get('/', async ctx => {
  ctx.body = { msg: 'Hello Koa Interfaces' };
});

const db = require('./config/keys').mongoURI;

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

  await next();
})

mongoose
  .connect(db,{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb Connectd...');
  })
  .catch(err => {
    console.log(err);
  });

router.use('/api/lists', lists);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
