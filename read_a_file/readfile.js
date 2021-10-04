// lire le fichier "serveur.js" en nodejs creer un serveur avec une route qui renvoie le contenue du fichier
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/hello', function (req, res) {

    res.send('Hello world');
})
app.get('/file', function (req, res) {
    const file = fs.promises.readFile('readfile.js', {
        encoding: 'utf-8',
        flag: 'r'
    }).then((file) => {
        res.setHeader('Content-Length', file.length);
        res.write(file, 'binary');
        res.end();
    }).catch((error) => {
        console.log(error)
        res.write('File does not exist!');
        res.end();
    });
})

app.listen(port, () => {
    console.log('App listening at http://localhost:3000')
})