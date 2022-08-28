const Router = require('express');
const router = new Router();
const ClassController = require('../controllers/classController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', ClassController.getAll);
router.post('/', checkRole('ADMIN'), ClassController.create);
router.get('/:class', ClassController.getByClass);



module.exports = router;