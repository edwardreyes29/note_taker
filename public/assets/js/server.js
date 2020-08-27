const express = require('express');
var app = express();
var path = require("path");
const port = 3000;


app.get('/notes', function(req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "../../../public/notes.html"));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));