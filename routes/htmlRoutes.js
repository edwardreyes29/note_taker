var path = require("path");

module.exports = function(app) {
    // GET /notes route to return notes.html file
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    })
    // GET / route to return index.html file
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    })
}