module.exports = {
    getRandom : getRandom,
    getOneRandom : getOneRandom
}

const path = require('path');
const fs = require('fs');

// Función que genera un video random al hacer click en el botón
function getRandom(success) {
    fs.readFile(path.join(__dirname, 'randomVideos.json'), (err, data) => {
        if (err == undefined) {
            let allRandom = JSON.parse(data);
            success(allRandom)
        }
    })    
}

function getOneRandom(id, success) {
    fs.readFile(path.join(__dirname, 'randomVideos.json'), (err, data) => {
        if (err == undefined) {
            allRandom = JSON.parse(data);
            let oneRandom = allRandom.find(item => item.id == id);
            success(oneRandom);
        }
    })   
}