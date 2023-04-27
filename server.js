//Dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.port || 3001;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route handler to send HMTL/JSON files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));

});

app.get('/api/notes', (req, res) => {
    console.info(`${req.method} Note request received`);
    readFileData('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


app.listen(PORT, () => console.log(`Notes app listening at http://localhost:${PORT}`));