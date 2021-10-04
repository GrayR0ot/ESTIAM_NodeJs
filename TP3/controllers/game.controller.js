const fs = require('fs');

exports.getGames = async function (req, res, next) {
    const file = fs.promises.readFile('games.json', {
        encoding: 'utf-8',
        flag: 'r'
    }).then((file) => {
        return res.status(200).json(JSON.parse(file));
    }).catch((error) => {
        return null;
    });
}
exports.getGame = async function (req, res, next) {
    const file = fs.promises.readFile('games.json', {
        encoding: 'utf-8',
        flag: 'r'
    }).then((file) => {
        let id = req.params.id;
        id--;
        console.log('INDEX: ' + id);
        JSON.parse(file)['games'].forEach((entry, index) => {
            if (index === id) {
                return res.status(200).json(JSON.parse(file)['games'][id]);
            }
        })
        return res.status(404);
    }).catch(() => {
        return res.status(500);
    });
}

exports.deleteGame = async function (req, res, next) {
    const file = fs.promises.readFile('games.json', {
        encoding: 'utf-8',
        flag: 'r'
    }).then((file) => {
        let id = req.params.id;
        id--;
        var games = JSON.parse(file)['games'];
        console.log('INDEX: ' + id);
        JSON.parse(file)['games'].forEach((entry, index) => {
            if (index === id) {
                games.splice(index, 1);
                const json = {games: games};
                fs.promises.writeFile('games.json', JSON.stringify(json), {
                    encoding: 'utf-8',
                    flag: 'w'
                }).then(() => {
                    return res.status(200).json({success: 'Suppression effectuée avec succès !'});
                }).catch(() => {
                    return res.status(200).json({error: 'Suppression impossible !'});
                })
            }
        });
    }).catch(() => {
        return res.status(200).json({error: 'Suppression impossible !'});
    });
    return res.status(200).json({error: 'Jeu inconnu !'});
}

exports.createGame = async function (req, res, next) {
    const data = req.body;
    const file = fs.promises.readFile('games.json', {
        encoding: 'utf-8',
        flag: 'r'
    }).then((file) => {
        const newGame = {
            name: data.name,
            dev: data.dev
        }
        if (newGame.name != null && newGame.dev != null) {
            var games = JSON.parse(file)['games'];
            console.log(games);
            games.push(newGame);
            let json = {games: games};
            fs.promises.writeFile('games.json', JSON.stringify(json), {
                encoding: 'utf-8',
                flag: 'w'
            }).then(() => {
                return res.status(200).json({success: 'Création effectuée avec succès !'});
            }).catch(() => {
                return res.status(200).json({error: 'Création impossible !'});
            })
        } else {
            return res.status(200).json({error: 'Paramètres non valides !'});
        }
    }).catch(() => {
        return res.status(200).json({error: 'Création impossible !'});
    });
    return res.status(200).json({error: 'Erreur inconnue !'});
}