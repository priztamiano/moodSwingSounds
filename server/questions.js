module.exports = {
    getQuestions : getQuestions
}

const path = require('path');
const fs = require('fs');

// Configuración de mongoDB
const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;
const mongoURL = 'mongodb://localhost:27017';
const dbName = "proyectoQuiz";

// Función que consulta los elementos de la colección 'questions
function getQuestions(cbDataReady, cbError) {
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        if (err) {            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            // Constante de la DB en un Objeto
            const db = client.db(dbName);
            // Constante de la colección 'questions'
            const collection = db.collection("questions");
            // Consulto TODOS los elementos de la colección, los convierto en Array y los paso al render
            collection.find().toArray((err, list) => {
                if (err) {
                    cbError("Error al consultar productos. " + err);
                } else {
                    cbDataReady(list);
                }
            });
        }
        // Cierro la conexión
        client.close();
    });
}

// Función que hace el request de las preguntas
/*
function getQuestions(success) {
    fs.readFile(path.join(__dirname, 'questions.json'), (err, data) => {
        if (err == undefined) {
            let allQuestions = JSON.parse(data);
            success(allQuestions)
        }
    })
}
*/

// Función que hace el request de cada una de las preguntas
function getOneQuestion() {
    
}