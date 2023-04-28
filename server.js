//Dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
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
    console.info(`${req.method} request received for note123`);
    // const getNotes = () => readFile(path.join(__dirname, './db/db.json')).then(notes => JSON.parse(notes));

    // getNotes()
    //     .then(notes => res.json(notes)).catch(err => res.json(err));
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.json(JSON.parse(data));
        }
      });
});

//Post request to add a note
//Add a new not to the database
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note or notes`);
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
        };

        const writeFile = require("fs").writeFile;
        readFile(path.join(__dirname, './db/db.json'), (err, data) => {
            if (err) console.error(err);
            else return JSON.parse(data);
        })
            .then(notes => {
                notes.push(newNote);
                return writeFile(path.join(__dirname, './db/db.json'), notes);
            })
            .catch((err) => console.error(err))
    }
    else {
        return res.status(400).json({ error: "Please provide a title and text for the note." });
    }
});

app.listen(PORT, () => console.log(`Notes app listening at http://localhost:${PORT}`));