const Game = require('../models/game')

exports.getGames = async function(req, res) {
    const findMany = Game.find({}, (fail, results) => {
        if (results) {
            return res.status(200).json(results);
        }
        if (fail) {
            console.log(fail);
            return res.status(500).json({error: fail});
        }
    });
}

exports.getGame = async function(req, res) {
    const findOne = Game.find({_id: req.params.id}, (fail, result) => {
        if (result) {
            return res.status(200).json(result);
        }
        if (fail) {
            console.log(fail);
            return res.status(500).json({error: fail});
        }
    })
}

exports.deleteGame = async function(req, res) {
    const deletion = Game.deleteOne({_id: req.params.id}, (fail, success) => {
        if (success) {
            if(success.deletedCount > 0) {
                return res.status(200).json({success: 'Jeu supprimé avec succès !'});
            } else {
                return res.status(200).json({success: 'Aucun jeu n\'existe à cet id !'});
            }
        }
        if (fail) {
            console.log(fail);
            return res.status(500).json({error: fail});
        }
    })
}

exports.createGame = async function(req, res) {
    const data = req.body;
    const newGame = {
        name: data.name,
        dev: data.dev
    }
    const creation = Game.insertMany(newGame, (fail, success) => {
        if (success) {
            //console.log(success);
            if(success.length > 0) {
                return res.status(200).json({success: 'Jeu créé avec succès à l\'id #' + success[0]._id + ' !'});
            } else {
                return res.status(200).json({success: 'Impossible de créer le jeu !'});
            }
        }
        if (fail) {
            //console.log(fail);
            if(fail.name === 'ValidationError') {
                return res.status(500).json({error: 'Les champs `name` et `dev` sont obligatoires !'});
            } else {
                return res.status(500).json({error: fail.name});
            }
        }
    })
}