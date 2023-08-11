const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { notFound, error } = require('./app/api/Middleware/error');
const router = require('./app/routes/api');
require('dotenv').config();
const port = 9000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', router);

app.use(notFound);
app.use(error);

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});