const Router = require('express');
const router = new Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const classRouter = require('./classRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/categories', categoryRouter);
router.use('/class', classRouter);


module.exports = router;