const Router = require('express');
const router = new Router();
const CategoryController = require('../controllers/categoryController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', CategoryController.getAll);
router.post('/', checkRole('ADMIN'), CategoryController.create);
router.get('/:category', CategoryController.getByCategory);



module.exports = router;