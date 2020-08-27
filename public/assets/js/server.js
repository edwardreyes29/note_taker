const express = require('express');

var app = express();
var path = require("path");

const port = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname));
// GET /notes route to return notes.html file
app.get('/notes', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../../../public/notes.html"));
    console.log()
})

// GET / route to return index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../../../public/index.html"));
})

// GET route to index.js
app.get('/assets/js/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, "index.js"));
})

// Get route to css
app.get('/assets/css/styles.css', function (req, res) {
    res.sendFile(path.join(__dirname, "../css/styles.css"));
})

var notes = [

]

app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// Create a new note
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    notes.push(newNote);
    res.json(newNote);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));