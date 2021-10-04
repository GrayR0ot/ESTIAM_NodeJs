const express = require('express');
const app = express();
const port = 3000;

app.get('/hello', function (req, res) {
    res.send('Hello world');
})

app.listen(port, () => {
    console.log('App listening at http://localhost:3000')
})