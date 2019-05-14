const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const questions = require('./questions.js');
const results = require('./results.js');
const random = require('./videoOfDay.js');

app.use(express.static(path.join(__dirname, '../client')))

app.listen(3333, () => {
    console.log("Listening @ 3333")
})

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/questions', (request, response) => {
    questions.getQuestions(arrQuestions => {
        response.send(arrQuestions)
    })
})

app.get('/questions/:id', (request, response) => {
    questions.getOneQuestion(request.params.id, oneQuestion => {
        response.send(oneQuestion);
    })
})

app.get('/results', (req, res) => {
    results.getResults(arrResults => {
        res.send(arrResults)
    })
})

app.get('/results/:mood', (req, res) => {
    results.getOneMood(req.params.mood, oneMood => {
        res.send(oneMood)
    })
})

app.get('/random', (req, res) => {
    random.getRandom(arrRandom => {
        res.send(arrRandom);
    })
})

app.get('/random/:id', (req, res) => {
    random.getOneRandom(req.params.id, oneRandom => {
        res.send(oneRandom);
    })
})
