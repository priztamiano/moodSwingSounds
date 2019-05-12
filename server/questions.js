module.exports = {
    getQuestions : getQuestions,
    getOneQuestion : getOneQuestion
}

const path = require('path');
const fs = require('fs');

// Función que consulta las preguntas de questions.json
function getQuestions(success) {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
        if (err == undefined) {
            let allQuestions = JSON.parse(data);
            success(allQuestions)
        }
    })
}

// Función que hace el request de cada una de las preguntas según ID
function getOneQuestion(id, success) {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
        if (err == undefined) {
            allQuestions = JSON.parse(data);
            let oneQuestion = allQuestions.find(item => item.id == id);
            success(oneQuestion);
        }
    })   
}