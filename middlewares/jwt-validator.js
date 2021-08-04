const { response } = require('express');
const jwt = require('jsonwebtoken');

const key = require('../key');

const jwtValidator = (req, res = response, next) => {
	const token = req.header('x-token');

	if (!token) return res.status(401).json({ msg: 'There is not token in the request' });

	jwt.verify(token, key, (error, payload) => {
		if (error) return res.status(401).json({ msg: 'Invalid token' });

		req.name = payload.name;
	});

	next();
};

module.exports = { jwtValidator };
