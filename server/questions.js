module.exports = {
    getQuestions : getQuestions,
    getOneQuestion : getOneQuestion
}

const path = require('path');
const fs = require('fs');

// Configuración de mongoDB
const mongoDB = require('mongodb');
const MongoClient = mongoDB.MongoClient;
const mongoURL = 'mongodb://localhost:27017';
const dbName = "proyectoQuiz";

// Función que consulta los elementos de la colección 'questions'
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
            collection.find().toArray((err, questionList) => {
                if (err) {
                    cbError("Error al consultar productos. " + err);
                } else {
                    cbDataReady(questionList);
                }
            });
        }
        // Cierro la conexión
        client.close();
    });
}

// Función que hace el request de cada una de las preguntas según ID
function getOneQuestion(documentId, cbDataReady, cbError) {
    MongoClient.connect(mongoURL, { useNewUrlParser: true }, (err, client) => {
        if (err) {            
            cbError("No se pudo conectar a la DB. " + err);
        } else {
            const db = client.db(dbName);
            const collection = db.collection("questions");
    // Convierte el objeto _id         
    collection.getOneQuestion({ _id: new mongodb.ObjectID(documentId) }, (err, response) => {
        if (err == undefined) {
            cbDataReady();
        } else {
            cbError("No se pudo mostrar la pregunta. " + err);
        }
        
        client.close();
    })        
}