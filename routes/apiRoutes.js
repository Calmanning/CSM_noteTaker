//API/DATA Routes

const router = require("express").Router();
const notedb = require("../db/notedb.js");

// What does this app do?
// write notes. (front end)
// save (post) notes 
// recall (get) them and edit them (put [optional]).
// delete notes.

//a request to post/save the note
router.post("/notedb",function(req, res) {
    console.log(req.body);
    notedb.postNote(req.body)
    .then((thisNote) => res.json(thisNote))
    .catch(error => res.status(500).json(error));
    
});


router.get("/notedb",function(req, res) {
    
    notedb.getNotes()
    .then(allTheNotes => res.json(allTheNotes))
    .catch(error => res.status(500).json(error));
});

//a request to delete
router.delete("/notedb/:id",function(req, res) {
    console.log("Here we are in the API route: " + req.params.id);
    notedb.deleteNote(req.params.id)
    .then(() => res.json({ok: true})) 
    .catch(error => res.status(500).json(error));
});

module.exports = router;