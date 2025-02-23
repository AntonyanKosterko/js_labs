const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const dogs = require('./server/dogs');

const app = express();
const host = 'localhost';
const port = 8000;

app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.use(express.json());
app.use(cors());

app.use('/api/dogs', dogs);

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
