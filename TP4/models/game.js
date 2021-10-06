const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dev: {
        type: String,
        required: true
    }
});

const Game = mongoose.model('game', gameSchema);
module.exports = Game;