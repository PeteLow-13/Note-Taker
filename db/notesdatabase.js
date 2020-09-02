const fs = require('fs');
const path = require('path')

class NotesDatabase{
    constructor(){

    }
    static getNotes() {
        var notes = [];
        notes = fs.readFileSync(path.join(__dirname +'/db.json'));
        return JSON.parse(notes); 
    }
    static addNote(title,text){
        
        var highestId = 0;
        var notes = JSON.parse(fs.readFileSync(path.join(__dirname +'/db.json')));
        notes.forEach(function(note){
            if (note.id > highestId){
                highestId = note.id;
            };
        });
        var note = {'id': ++highestId, 'title': title, 'text': text};
        notes.push(note);
        fs.writeFileSync(path.join(__dirname+ '/db.json'), JSON.stringify(notes));

        return note;
    }
    static deleteNote(id){
        var notes = JSON.parse(fs.readFileSync(path.join(__dirname +'/db.json')));
        notes.forEach(function(note, index){
            if (note.id == id){
                notes.splice(index, 1);
            };
        });
        fs.writeFileSync(path.join(__dirname+ '/db.json'), JSON.stringify(notes));
    }


}; 


module.exports = NotesDatabase;