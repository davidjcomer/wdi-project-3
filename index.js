const express = require('express');
const app = express();
const env = require('./config/environment');

const mongoose = require('mongoose');
mongoose.connect(env.dbUri);

const router = require('./config/router');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use('/api', router);

app.listen(env.port, () => console.log(`Express is running on port ${env.port}`));

module.exports = app;
