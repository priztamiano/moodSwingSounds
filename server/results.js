module.exports = {
    getResults : getResults,
    getOneMood : getOneMood
}

const path = require('path');
const fs = require('fs');

// Función que consulta las preguntas de questions.json
function getResults(success) {
    fs.readFile(path.join(__dirname, 'results.json'), (err, data) => {
        if (err == undefined) {
            let allResults = JSON.parse(data);
            success(allResults)
        }
    })
}

// Función que hace el request de cada una de las preguntas según mood
function getOneMood(mood, success) {
    fs.readFile(path.join(__dirname, 'results.json'), (err, data) => {
        if (err == undefined) {
            allResults = JSON.parse(data);
            let oneMood = allResults.find(item => item.resultId == mood);
            success(oneMood);
        }
    })   
}