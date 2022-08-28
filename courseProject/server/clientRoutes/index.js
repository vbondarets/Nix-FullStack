const Router = require('express');
const ClientRouter = new Router();
const clientRouter = require('./clientRouter');

ClientRouter.use('/', clientRouter);

module.exports = ClientRouter;