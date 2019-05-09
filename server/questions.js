module.exports = {
    getQuestions : getQuestions
}

const path = require('path');
const fs = require('fs');
const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;

function getQuestions(success) {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
        if (err == undefined) {
            let allQuestions = JSON.parse(data);
            success(allQuestions)
        }
    })
}