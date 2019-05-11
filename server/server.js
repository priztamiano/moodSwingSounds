const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const questions = require('./questions.js');
const results = require('./results.js');


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