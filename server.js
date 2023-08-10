const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('You are accessing LOD API');
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});