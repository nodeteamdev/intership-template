const { Router } = require('express');
const AuthMiddleware = require('../../config/middlewares/authMiddleware');
const ChatComponent = require('.');

const router = Router();

router.get('/chat', ChatComponent.chatRoom);

module.exports = router;