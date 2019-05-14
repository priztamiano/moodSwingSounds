window.onload = function() {
    loadName();
    requestQuestions(showQuestion);
}

// Declaraciones de constantes del DOM
const nameInput = document.getElementById("nameInput");
const nameTag = document.getElementById("nameTag");
const buttonStart = document.getElementById("buttonStart");
const secondSection = document.getElementById("secondSection");
const divQuestion = document.getElementById("question");
const buttonNext = document.getElementById("buttonNext");
const thirdSection = document.getElementById("thirdSection");
const divSong = document.getElementById("song");
const divArtist = document.getElementById("artist");
const divVideo = document.getElementById("video");
const divDescription = document.getElementById("description");

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
            let pQuestion = document.createElement('p');
            pQuestion.classList.add('p-question')
            pQuestion.innerHTML = questionsList[i].question;
            divPerQuestion.appendChild(pQuestion);
            divPerQuestion.classList.add('answers-group');
            divQuestion.appendChild(divPerQuestion);
            buttonNext.style.display = "inline-block";
            buttonNext.addEventListener('click', () => {
                requestResults(showVideo);
            })
            console.log(questionsList[i].question)

            for (let j = 0; j < questionsList[i].answers.length; j++) {
                switch (questionsList[i].id) {
                    case 1:
                    case 2:
                    case 3:
                    case 4:
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

                    case 5:
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
            //console.log(questionsList[i].answers[j]);
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

// Función que arma el iframe de los videos y los muestra en su sección
function showVideo(resultsList) {
    thirdSection.style.display = "block";

    let happyCount = 0, sadCount = 0, boredCount = 0, angryCount = 0;
    let selectedOptions = document.getElementsByClassName('selected');
    if (selectedOptions.length == 5) {
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].classList.contains("happy")) happyCount++;
            if (selectedOptions[i].classList.contains("sad")) sadCount++;
            if (selectedOptions[i].classList.contains("angry")) angryCount++;
            if (selectedOptions[i].classList.contains("bored")) boredCount++;
        }
        document.getElementById("selectedResult").innerText = `happy: ${happyCount} | sad: ${sadCount} | angry: ${angryCount} | bored: ${boredCount}`;
    } else {
        alert('Completa todo el cuestionario para obtener tu resultado :)') // TO DO: que aparezca solo 1 vez y no por cada loop
    }

        if (resultsList) {
            divQuestion.style.display = "none";
            buttonNext.style.display = "none";
            for (let j = 0; j < resultsList.length; j++) {
                if ((happyCount > sadCount) && (happyCount > angryCount) && (happyCount > boredCount)) {
                    console.log('happy');
                    
                    for (let k = 0; k < resultsList[0].tracks.length; k++) {
                        // console.log(resultsList[0].tracks[k]);
                        let randomTrack = resultsList[0].tracks[`${Math.floor(Math.random() * 5)}`];
                        divSong.innerText = randomTrack.title;
                        console.log(randomTrack.title)        
                    }
                } else if ((sadCount > happyCount) && (sadCount > angryCount) && (sadCount > boredCount)) {
                    console.log('sad');
                    for (let k = 0; k < resultsList[1].tracks.length; k++) {
                        // console.log(resultsList[1].tracks[k]);
                        let randomTrack = resultsList[1].tracks[`${Math.floor(Math.random() * 5)}`];
                        divSong.innerText = randomTrack.title;
                        console.log(randomTrack.title)        
                    }
                } else if ((angryCount > happyCount) && (angryCount > sadCount) && (angryCount > boredCount)) {
                    console.log('angry');
                    for (let k = 0; k < resultsList[2].tracks.length; k++) {
                        // console.log(resultsList[2].tracks[k]);
                        let randomTrack = resultsList[2].tracks[`${Math.floor(Math.random() * 5)}`];
                        divSong.innerText = randomTrack.title;
                        console.log(randomTrack.title)        
                    }
                } else if ((boredCount > happyCount) && (boredCount > sadCount) && (boredCount > angryCount)) {
                    console.log('bored')
                    for (let k = 0; k < resultsList[3].tracks.length; k++) {
                        // console.log(resultsList[3].tracks[k]);
                        let randomTrack = resultsList[3].tracks[`${Math.floor(Math.random() * 5)}`];
                        divSong.innerText = randomTrack.title;
                        console.log(randomTrack.title)        
                    }
                }
        
            }
        
        
                // 
                // divArtist.innerText = resultsList[j].tracks[k].artist;
                // ifrm.setAttribute("src", `https://youtu.be/${resultsList[j].tracks[k].link}`);
                // ifrm.style.width = "640px";
                // ifrm.style.height = "480px";
                // divVideo.appendChild(ifrm);
            

        }
}