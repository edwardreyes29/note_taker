const express = require('express');
const fs = require('fs');

var app = express();
var path = require("path");

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET /notes route to return notes.html file
app.get('/notes', function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// GET / route to return index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// Sends JSON data as a response
app.get("/api/notes", function (req, res) {
    const notes = JSON.parse(getJSONData()); // parse data to JSON
    res.json(notes); // send response
});

// Create a new note, assign a unique id, and store it into the db.json file
app.post("/api/notes", function (req, res) {
    const notes = JSON.parse(getJSONData()); // parse data to JSON
    const newNote = req.body;   // get new note
    notes.push(newNote); // push new note to notes array
    const assignedNotes = assignUniqueIds(notes); // assign unique id's to each item and return a new array
    writeToJSON(assignedNotes); // store new notes to db.json
    res.json(true); // send response
});

// Delete a note
app.delete("/api/notes/:id", function(req, res) {
    const chosenId = parseInt(req.params.id); // Get the id of the selected note for deletion
    const notes = JSON.parse(getJSONData()); // parse data to JSON
    const filteredNotes = notes.filter(note => parseInt(note.id) !== chosenId); // filters array with matching id and returns a new filtered array
    writeToJSON(filteredNotes); // store new notes to db.json
    res.json(filteredNotes); // send response
})

app.listen(PORT, () => console.log("App listening on PORT " + PORT));

// Stores notes to db.json
const writeToJSON = (notes) => {
    let data = JSON.stringify(notes, null, 4);
    fs.writeFile(path.join(__dirname, "./db/db.json"), data, (err) => {
        if (err) throw err;
    });
}

// Returns data from db.json
const getJSONData = () => fs.readFileSync(path.join(__dirname, "./db/db.json"));

// Assigns a unique id for each note
const assignUniqueIds = array => {
    const copyArray = [...array];
    for (let i = 0; i < copyArray.length; i++) {
        copyArray[i].id = i+1;
    }
    return copyArray;
}