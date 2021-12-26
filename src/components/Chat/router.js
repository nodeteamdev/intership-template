const { Router } = require('express');
const path = require('path');
// const AuthMiddleware = require('../Auth/middleware');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();
/**
 * Route serving list of users.
 * @name /chat
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../views', '/index.html')));

module.exports = router;
