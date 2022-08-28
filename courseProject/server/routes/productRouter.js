const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/productController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.get('/', ProductController.getAll);
router.post('/', checkRole('ADMIN'), ProductController.create);
router.get('/:id', ProductController.getOne);
router.post('/photo/:id', checkRole('ADMIN'), ProductController.addPhoto)
router.get('/photo/:id', ProductController.getPhotos)



module.exports = router;