//Install express server
const express = require('express');
var compression = require('compression')
const path = require('path');

const app = express();
app.use(compression())
// Serve only the static files form the dist directory
app.use(express.static('./www/'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(3005);