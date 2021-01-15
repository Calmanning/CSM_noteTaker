const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// helps you get the body a request in JSON format
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static("public"));

// NAV Routes

app.get("/",function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/notes",function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

//API/DATA Routes
// TODO: don't leave that empty
app.post("", function(req, res) {

});

app.get("/api/notedb",function(req, res) {
    fs.res.readFile("db.json", "utf8", (err, data) => {
        if (err) throw err
        console.log(JSON.parse(data));
        res.JSON.paser(data)
    })
});

app.delete("", function(req, res){

});

app.listen(PORT, function () {
    console.log("We're listening over at http://localhost:" + PORT);
});