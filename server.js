const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const NotesDatabase = require('./db/notesDatabase');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(NotesDatabase.getNotes());
});

app.post('/api/notes', (req, res) => {
    res.json(NotesDatabase.addNote(req.body.title, req.body.text));
});

app.delete('/api/notes/:id', (req, res) =>{
    NotesDatabase.deleteNote(req.params.id);
    res.status(204).send();
    
});

app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/assets/js/index.js'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname +'/public/index.html'));
});


app.listen(port, () => {
    console.log("example app listening");
});
