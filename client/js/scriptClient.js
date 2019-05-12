window.onload = function() {
    loadName();
    requestQuestions(showQuestion);
}
// Declaraciones de contantes del DOM
const nameInput = document.getElementById("nameInput");
const nameTag = document.getElementById("nameTag");
const buttonStart = document.getElementById("buttonStart");
const buttonNext = document.getElementById("buttonNext");
const divQuestion = document.getElementById("question");

// Función que carga el nombre de user al clickear el primer botón
function loadName() {
    buttonStart.addEventListener("click", () => {
        nameTag.innerText = `Bienvenidx ${nameInput.value}`;
    })
}

// Función que hace el request de las preguntas
function requestQuestions(cbReqQuestions) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        let questionsParsed = JSON.parse(request.responseText);
        console.log(questionsParsed);
        cbReqQuestions(questionsParsed);
    }

    request.open('GET', 'http://localhost:3333/questions');
    request.send();
}


// Función que muestra las preguntas con sus posibles respuestas
function showQuestion(questionsList) {
    buttonStart.addEventListener('click', () => {
    if (questionsList) {
        for (let i = 0; i < questionsList.length; i++) {
                       
            let divPerQuestion = document.createElement('div');
            divPerQuestion.innerText = questionsList[i].question;
            divQuestion.appendChild(divPerQuestion);
            buttonNext.style.display = "inline-block";
            console.log(questionsList[i].question)

            for (let j = 0; j < questionsList[i].answers.length; j++) {
                switch (questionsList[i].id) {
                    case 1:
                    case 2:
                    case 3:
                    let buttonPerAnswer = document.createElement('a');
                    buttonPerAnswer.innerText = questionsList[i].answers[j];
                    buttonPerAnswer.setAttribute('class', 'buttonOne');
                    divQuestion.appendChild(buttonPerAnswer);
                    break;

                    case 4:
                    console.log('Cuarto elemento');
                    let img = document.createElement('img');
                    img.setAttribute('src', `img/${questionsList[i].answers[j]}.gif`);
                    img.setAttribute('alt', 'GIFS by John Karel');
                    img.setAttribute('class', 'img-gif');
                    divQuestion.appendChild(img);
                    break;
                }
            console.log(questionsList[i].answers[j])
            }
        }
    }
    })
}


function moodResult() {
    let happy = 0;
    let sad = 0;
    let angry = 0;
    let bored = 0;
}