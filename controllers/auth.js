const { response } = require('express');
const user = require('../user.json');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const key = require('../key');

const login = async (req, res = response) => {
	const { email, password } = req.body;

	if (email !== user.email) return res.status(400).json({ msg: 'The email is not register' });

	const match = await bcrypt.compare(password, user.password);

	if (!match) return res.status(400).json({ msg: 'Email or password are invalid' });

	const token = jwt.sign({ name: user.name }, key, { expiresIn: '4h' });

	res.json({
		msg: 'Login successful',
		token,
	});
};

const greet = (req, res = response) => {
	res.json({
		msg: `Hi, ${req.name}`,
	});
};

module.exports = { login, greet };
