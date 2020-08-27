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


app.get("/api/notes", function (req, res) {
    let rawdata =  getJSONData(); 
    let notes = JSON.parse(rawdata);
    res.json(notes);
});

// Create a new note
app.post("/api/notes", function (req, res) {
    let rawdata =  getJSONData(); 
    let notes = JSON.parse(rawdata);

    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    assignIDs(notes);
    writeToJSON(notes);
    res.json(newNote);
});
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