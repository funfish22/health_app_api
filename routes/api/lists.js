const Router = require('koa-router');
const router = new Router();
const List = require('../../models/List');

router.get('/', async ctx => {
  await List.find()
    .then(lists => {
      ctx.status = 200;
      ctx.body = lists;
    })
    .catch(err => {
      ctx.status = 404;
      ctx.body = { notFound: '找不到任何東西' };
    });
});

router.post(
  '/add',
  async ctx => {
    const newList = new List({
      data: ctx.request.body.data
    });

    await newList
      .save()
      .then(list => (ctx.body = list))
      .catch(err => (ctx.body = err));

    ctx.body = newList;
  }
);

router.delete('/delete/:id',
  async ctx => {
    await List.remove({ _id: ctx.params.id }).then(() => {
      ctx.status = 200;
      ctx.body = { success: true };
    });
  }
)

module.exports = router.routes();
