const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NoteDB {
    constructor(noteId){ 
        this.noteId = 0
        
    } 

    getNotes() {
        return this.read().then(notes => {
            let readNotes;
            try {
                readNotes=[].concat(JSON.parse(notes))
            } catch (error) {
                readNotes = []
                console.log("something broke in getNotes, genius.")    
            }
                return readNotes
            
        }) 
    }
//will be the note itself
    postNote(calledNote) {
        const {title, text} = calledNote;
        const savedNote = {title, text, id:++this.noteID}
        return this.getNotes().then(notes => [...notes, savedNote])
        .then(noteList => this.write(noteList))
        .then(() => savedNote)

    }
//based on noteId
    deleteNote(){

    }

    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(noteText) {
        return writeFileAsync("db/db.json", JSON.stringify(noteText));
    }
    
}

module.exports = new NoteDB()   

// // fs.res.readFile("db.json", "utf8", (err, data) => {
//     if (err) throw err
//     console.log(JSON.parse(data));
//     res.JSON.paser(data)
// })