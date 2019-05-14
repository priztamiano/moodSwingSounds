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
const divVideo = document.getElementById("video");
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
            // divPerQuestion.setAttribute('id', `div${questionsList[i].id}`);
            divPerQuestion.innerText = questionsList[i].question;
            divPerQuestion.classList.add('answers-group');
            divQuestion.appendChild(divPerQuestion);
            buttonNext.style.display = "inline-block";
            buttonNext.addEventListener('click', () => {
                getResult();
                //requestResults(showVideo);
            })
            console.log(questionsList[i].question)

            for (let j = 0; j < questionsList[i].answers.length; j++) {
                switch (questionsList[i].id) {
                    case 1:
                    case 2:
                    case 3:
                    let buttonPerAnswer = document.createElement('a');
                    buttonPerAnswer.setAttribute('class', 'button-one button-two');
                    buttonPerAnswer.innerText = questionsList[i].answers[j].mood;
                    divPerQuestion.appendChild(buttonPerAnswer);
                    buttonPerAnswer.classList.add('option');
                    buttonPerAnswer.classList.add(`group-${questionsList[i].id}`);
                    buttonPerAnswer.classList.add(`${questionsList[i].answers[j].idAnswer}`);
                    buttonPerAnswer.onclick = () => {
                            let groupOptionElements = buttonPerAnswer.parentElement.children;
                            for (let i = 0; i < groupOptionElements.length; i++) {
                                if (groupOptionElements[i] == buttonPerAnswer) {
                                    groupOptionElements[i].classList.toggle('selected');
                                } else {
                                    groupOptionElements[i].classList.remove("selected");
                                }
                            }
                        }
                    
                    break;

                    case 4:
                    let img = document.createElement('img');
                    img.setAttribute('src', `img/${questionsList[i].answers[j].mood}.gif`);
                    img.setAttribute('alt', 'GIFS by John Karel');
                    img.setAttribute('class', 'img-gif');
                    divPerQuestion.appendChild(img);
                    img.classList.add('option');
                    img.classList.add(`group-${questionsList[i].id}`);
                    img.classList.add(`${questionsList[i].answers[j].idAnswer}`);
                    // img.setAttribute('id', `button${questionsList[i].answers[j].idAnswer}`);
                    img.onclick = () => {
                        let groupOptionElements = img.parentElement.children;
                        for (let i = 0; i < groupOptionElements.length; i++) {
                            if (groupOptionElements[i] == img) {
                                groupOptionElements[i].classList.toggle('selected');
                                groupOptionElements[i].classList.toggle('img-selected');
                            } else {
                                groupOptionElements[i].classList.remove('selected');
                                groupOptionElements[i].classList.remove('img-selected');
                            }
                        }
                    }

                    break;
                }
            console.log(questionsList[i].answers[j]);
            }
        }
    }
    })
}

// Función que hace el request de los datos de resultados
function requestResults(cbReqQuestions) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        let resultsParsed = JSON.parse(request.responseText);
        console.log(resultsParsed);
        cbReqQuestions(resultsParsed);
    }

    request.open('GET', 'http://localhost:3333/results');
    request.send();
}

// Función que hace el conteo de resultados
function getResult() {
    let happyCount = 0, sadCount = 0, boredCount = 0, angryCount = 0;
    let selectedOptions = document.getElementsByClassName('selected');
    if (selectedOptions.length == 4) {
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].classList.contains("happy")) happyCount++;
            if (selectedOptions[i].classList.contains("sad")) sadCount++;
            if (selectedOptions[i].classList.contains("angry")) angryCount++;
            if (selectedOptions[i].classList.contains("bored")) boredCount++;
        }
        document.getElementById("selectedResult").innerText = `happy: ${happyCount} | sad: ${sadCount} | bored: ${boredCount} | angry: ${angryCount}`;
    } else {
        alert('Completa todo el cuestionario para obtener tu resultado :)') // TO DO: que aparezca solo 1 vez y no por cada loop
    }
}


// Función que arma el iframe de los videos y los muestra en su sección
function showVideo(resultsList) {
    var ifrm = document.createElement("iframe");
    if (resultsList) {
        for (let i = 0; i < resultsList.length; i++) {
            for (let j = 0; j < resultsList[i].tracks; j++) {
                ifrm.setAttribute("src", `https://youtu.be/${resultsList[i].tracks[j].link}`);
                ifrm.style.width = "640px";
                ifrm.style.height = "480px";
                divVideo.appendChild(ifrm);
            }
        }
    }
}