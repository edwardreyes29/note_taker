const express = require('express');
const fs = require('fs');

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

// Sends JSON data as a response
app.get("/api/notes", function (req, res) {
    let rawdata =  getJSONData(); 
    let notes = JSON.parse(rawdata);
    res.json(notes);
});

// Create a new note, assign a unique id, and store it into the db.json file
app.post("/api/notes", function (req, res) {
    let rawdata =  getJSONData(); // get raw data
    let notes = JSON.parse(rawdata); // parse data to JSON
    var newNote = req.body; // get new note
    notes.push(newNote); // push to array
    assignIDs(notes); // assign unique id's to each item
    writeToJSON(notes);
    res.json(newNote);
});

// Delete note
app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params.id);
    let id = parseInt(req.params.id);
    let rawdata =  getJSONData(); 
    let notes = JSON.parse(rawdata);
    const filteredNotes = notes.filter(note => parseInt(note.id) !== id);
    writeToJSON(filteredNotes);
    res.json(filteredNotes);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// File System
const writeToJSON = (notes) => {
    let data = JSON.stringify(notes, null, 4);
    fs.writeFile(path.join(__dirname, "../../../db/db.json"), data, (err) => {
        if (err) throw err;
        console.log('The note has been saved!');
    });
}

const getJSONData = () => {
    return fs.readFileSync(path.join(__dirname, "../../../db/db.json"));
}

const assignIDs = array => {
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        array[i].id = i+1;
    }
    return array;
}