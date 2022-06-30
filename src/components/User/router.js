// const { Router } = require('express');
// const UserComponent = require('.');

// /**
//  * Express router to mount user related functions on.
//  * @type {Express.Router}
//  * @const
//  */
// const router = Router();

// /**
//  * Route serving list of users.
//  * @name /v1/users
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware.
//  */
// router.get('/', UserComponent.findAll);

// /**
//  * Route serving a user
//  * @name /v1/users/:id
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware.
//  */
// router.get('/:id', UserComponent.findById);

// /**
//  * Route serving a new user
//  * @name /v1/users
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware
//  */
// router.post('/', UserComponent.create);

// // router.post('/auth', UserComponent.auth);

// /**
//  * Route serving a new user
//  * @name /v1/users
//  * @function
//  * @inner
//  * @param {string} path - Express path
//  * @param {callback} middleware - Express middleware
//  */
// router.put('/', UserComponent.updateById);

// /**
//  * Route serving a new user
//  * @name /v1/users
//  * @function
//  * @inner
//  * @param {string} path -Express path
//  * @param {callback} middleware - Express middleware
//  */
// router.delete('/', UserComponent.deleteById);

// module.exports = router;

const express = require('express');

const router = express.Router();
const userController = require('./index');
const { auth } = require('../../middleware/auth');

router.post('/register', userController.newUser);

router.get('/profile/:_id', auth, userController.getUser);

router.get('/list', auth, userController.getUsers);

router.put('/update/:_id', auth, userController.updateUser);

router.delete('/delete/:_id', auth, userController.deleteUser);

router.post('/login', userController.loginUser);

router.post('/refresh', userController.refreshTokenUser);

router.get('/logout', userController.logoutUser);

module.exports = router;
