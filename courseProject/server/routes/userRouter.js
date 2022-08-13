const Router = require('express');
const router = new Router();
const UserController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', UserController.login);
router.post('/registration', UserController.registration);
router.get('/auth', authMiddleware,UserController.check);


module.exports = router;