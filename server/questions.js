module.exports = {
    getQuestions : getQuestions
}

const path = require('path');
const fs = require('fs');
const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;

// Función que hace el request de las preguntas
function getQuestions(success) {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
        if (err == undefined) {
            let allQuestions = JSON.parse(data);
            success(allQuestions)
        }
    })
}

// Función que hace el request de cada una de las preguntas
function getOneQuestion() {
    
}