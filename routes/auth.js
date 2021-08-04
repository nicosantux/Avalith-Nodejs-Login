const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');

const { login, greet } = require('../controllers/auth');

router.post(
	'/login',
	[
		check('email', 'Email is required').not().isEmpty(),
		check('email', 'Enter a valid email address').isEmail(),
		check('password', 'Password is required').not().isEmpty(),
		check('password', 'Password must have a minimum of 6 characters').isLength({ min: 6 }),
		fieldValidator,
	],
	login
);

router.get('/greet', jwtValidator, greet);

module.exports = router;
