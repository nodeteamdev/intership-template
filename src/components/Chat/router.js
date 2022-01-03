const { Router } = require('express');
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
router.get('/chatroom', (req, res) => res.render('chat', { user: { firstName: 'Test', lastName: 'fsdafa' } }));

module.exports = router;
