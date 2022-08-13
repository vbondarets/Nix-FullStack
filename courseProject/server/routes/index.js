const Router = require('express');
const router = new Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/type', typeRouter);


module.exports = router;