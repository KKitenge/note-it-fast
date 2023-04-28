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

//Get notes in db
app.get("/api/notes", (req, res) => {
    const getNotes = () => readFile("db/db.json", "utf8")
        .then(notes => JSON.parse(notes));

    getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.json(err));
});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body 
    if (title && text) {
        const newNote = {
            title,
            text,
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
    }
    return response
});

app.listen(PORT, () => console.log(`Notes app listening at http://localhost:${PORT}`));