const { Router } = require('express');
const BookComponent = require('.');
const AuthMiddleware = require('../../config/middlewares/authMiddleware');
const upload = require('../../config/upload');


const router = Router();

router
  .get('/upload', AuthMiddleware, (req, res) => res.render('upload'))
  .post('/upload', upload.single('file'), BookComponent.upload);

router.get('/count-per-country', AuthMiddleware, BookComponent.countPerCountry);
router.get('/new-books', AuthMiddleware, BookComponent.findNewestBooks);
router.get('/', AuthMiddleware, BookComponent.findAll);
router.get('/:id', AuthMiddleware, BookComponent.findById);
router.put('/', AuthMiddleware, BookComponent.updateById);
router.delete('/', AuthMiddleware, BookComponent.deleteById);

module.exports = router;
