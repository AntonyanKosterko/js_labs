const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const HOST = 'localhost';
const PORT = 8000;

const readJson = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, fileName), "utf8");

    return JSON.parse(file);
};

const STORAGE_NAME = 'stocks.json';

app.get('/stocks', (req, res) => {
    const stocks = readJson(STORAGE_NAME);
    res.send(stocks);
});

app.get('/stocks/:id', (req, res) => {
    const id = req.params.id;
    const numberId = Number.parseInt(id);

    if (Number.isNaN(numberId)) {
        res.status(400).send({status: 'Bad Request', message: 'id must be number!'});
    }

    const stocks = readJson(storageName);
    const stock = stocks.find((value) => {
        return value.id === numberId;
    });

    if (stock) {
        res.send(stock);
    } else {
        res.status(404).send({status: 'Not Found', message: `not found stock with id ${numberId}`});
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});