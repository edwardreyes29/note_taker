const express = require('express');
const fs = require('fs');

var app = express();
var path = require("path");

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// points our server to the correct route files
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => console.log("App listening on PORT " + PORT));
