const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const logger = require("morgan");
const API_PORT = 3001
const app = express()
const gigantti = require("./routes/gigantti/index.js");

app.use(cors());
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use('/api', gigantti);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
