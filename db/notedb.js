const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);



class NoteDB {

    getNotes() {
        return this.read().then(notes => {
            let readNotes;
            try {
                readNotes=[].concat(JSON.parse(notes))
            } catch (error) {
                readNotes = []
                console.log("something broke in getNotes.")    
            }
                return readNotes
            
        }) 
    }
//will be the saved note
    postNote(calledNote) {
        
        return this.getNotes().then(notes => [...notes, calledNote])
        .then(noteList => this.write(noteList))
        .then(() => calledNote)

    }

    deleteNote(trashNoteId){
        console.log("and here's the info from the db call: " + trashNoteId)
        return this.getNotes()
            .then(allNotes => allNotes.filter(trashNote => trashNote.id !== parseInt(trashNoteId)))
            .then(console.log(allNotes)).then(newNotesList => this.write(newNotesList))
        
    }

    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(noteText) {
        return writeFileAsync("db/db.json", JSON.stringify(noteText));
    }
    
}

module.exports = new NoteDB()   
