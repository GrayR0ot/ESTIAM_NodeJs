var express = require('express');
var router = express.Router();
var GameController = require('../controllers/game.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/games', GameController.getGames);
router.get('/game/:id', GameController.getGame);
router.delete('/game/:id', GameController.deleteGame);
router.post('/game', GameController.createGame);
module.exports = router;
