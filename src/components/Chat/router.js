const { Router } = require('express');
const isAuth = require('../Auth/middleware');
const ChatComponent = require('.');

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
router.get('/', isAuth, ChatComponent.getChat);

module.exports = router;
