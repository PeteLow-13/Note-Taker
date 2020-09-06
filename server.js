const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let PORT = process.env.PORT || 3001;
const path = require('path');
const NotesDatabase = require('./db/notesdatabase.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.json(path.join(__dirname, + "public/index.html"));
});

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


app.listen(PORT, () => {
    console.log("example app listening");
});
