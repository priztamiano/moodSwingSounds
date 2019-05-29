window.onload = function() {
    loadName();
    requestRandom(openModal);
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
const btnModal = document.getElementById("buttonRandom");
const btnClose = document.getElementById("btnCloseModal");
const modal = document.getElementById("videoOfTheDay");
const btnAgain = document.getElementById("btnAgain");
const btnOtherTrack = document.getElementById("btnOtherTrack")

// Función que carga el nombre de user y ejectuta la carga de preguntas al clickear el primer botón
function loadName() {
    buttonStart.addEventListener("click", () => {
        nameTag.innerText = `Hey ${nameInput.value}!`;
    });
    buttonStart.addEventListener('click', () => {
        requestQuestions(showQuestion);
        },
    // El evento solo puede suceder una vez con este parámetro
    {once:true}
    )
}

// Función que hace el request de los videos random a través de AJAX
function requestRandom(cbRandomVid) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        let randomList = JSON.parse(request.responseText);
        cbRandomVid(randomList)
    }
    request.open('GET', 'http://localhost:3333/random');
    request.send();
}

// Función que abre el modal de Video of the Day y arma el iframe al hacer click en el botón
function openModal(randomList) {
    let iframe = document.createElement('iframe');
    iframe.style.width = "853px";
    iframe.style.height = "505px";
    iframe.classList.add('modal-content');
    btnModal.addEventListener('click', () => {
        // Selecciona el video de forma aleatoria y lo muestra
        if (randomList) {
            for (let i = 0; i < randomList.length; i++) {
                let randomVid = randomList[`${Math.floor(Math.random() * 5)}`].link;
                iframe.setAttribute("src", `https://youtube.com/embed/${randomVid}`);
                console.log(randomVid);
                modal.appendChild(iframe);
                modal.style.display = "block";    
                break;
            }
        }
    })
    btnClose.addEventListener('click', () => {
        // Cierra el modal y le quita el source al iframe para que pare la reproducción
        iframe.setAttribute("src", "")
        modal.style.display = "none";
    })
}

// Función que hace el request de las preguntas a través de AJAX
function requestQuestions(cbReqQuestions) {
    let request = new XMLHttpRequest();
    request.onload = () => {
        let questionsParsed = JSON.parse(request.responseText);
        cbReqQuestions(questionsParsed);
    }
    request.open('GET', 'http://localhost:3333/questions');
    request.send();
}

// Función que muestra las preguntas con sus posibles respuestas
function showQuestion(questionsList) {
    if (questionsList) {
       // Itera la lista de preguntas para renderizarlas
        for (let i = 0; i < questionsList.length; i++) {
            let divPerQuestion = document.createElement('div');
            let pQuestion = document.createElement('p');
            pQuestion.classList.add('p-question')
            pQuestion.innerHTML = questionsList[i].question;
            divPerQuestion.appendChild(pQuestion);
            divPerQuestion.classList.add('answers-group');
            divQuestion.appendChild(divPerQuestion);
            console.log(questionsList[i].question)
            // Itera la lista de respuestas posibles dentro de questionsList y les asigna las clases correspondientes para calcular resultados
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
            }
        }
        // Muestra el botón que envía la respuesta y le asigna la función de mostrar el resultado
        buttonNext.style.display = "inline-block";
        buttonNext.addEventListener('click', () => {
            requestResults(showVideo);
            },
        {once: true}
        );
    }
}

// Función que hace el request de los datos de resultados a través de AJAX
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
    // Muestro la tercer sección
    thirdSection.style.display = "block";
    // Declaro variable por cada mood
    let happyCount = 0, sadCount = 0, boredCount = 0, angryCount = 0;
    // Agrupo las opciones seleccionadas tomándolas por su clase
    let selectedOptions = document.getElementsByClassName('selected');
    // Si cada pregunta tiene respuesta, itero las respuestas y sumo uno a su variable correspondiente
    if (selectedOptions.length == 5) {
        for (let i = 0; i < selectedOptions.length; i++) {
            if (selectedOptions[i].classList.contains("happy")) happyCount++;
            if (selectedOptions[i].classList.contains("sad")) sadCount++;
            if (selectedOptions[i].classList.contains("angry")) angryCount++;
            if (selectedOptions[i].classList.contains("bored")) boredCount++;
        }
        document.getElementById("selectedResult").innerText = `happy: ${happyCount} | sad: ${sadCount} | angry: ${angryCount} | bored: ${boredCount}`;
    } else {
        // Sino, alerto que faltan respuestas. TO DO: cambiar alert por modal con estilado 
        alert('Completa todo el cuestionario para obtener tu resultado :)');
        thirdSection.style.display = "none";
    }
        // Si existe la lista de resultados (obtenida por AJAX) y cada pregunta tiene respuesta, muestro los puntajes
        if (resultsList && selectedOptions.length == 5) {
            document.getElementById("selectedResult").style.display = "block";
            secondSection.style.display = "none";
            let ifrRes = document.createElement('iframe');
            ifrRes.style.width = "853px";
            ifrRes.style.height = "505px";
            // Si HAPPY es mayor...
            if ((happyCount > sadCount) && (happyCount > angryCount) && (happyCount > boredCount)) {
                console.log('happy');
                for (let j = 0; j < resultsList[0].tracks.length; j++) {
                    let randomTrack = resultsList[0].tracks[`${Math.floor(Math.random() * 5)}`];
                    divSong.appendChild(document.createTextNode(randomTrack.title));
                    divArtist.appendChild(document.createTextNode(randomTrack.artist));
                    ifrRes.setAttribute('src', `https://youtube.com/embed/${randomTrack.link}`);
                    divVideo.appendChild(ifrRes);
                    divDescription.appendChild(document.createTextNode(randomTrack.trackDescription));
                    console.log(randomTrack.title);
                    break;        
                }
            // Si SAD es mayor...    
            } else if ((sadCount > happyCount) && (sadCount > angryCount) && (sadCount > boredCount)) {
                console.log('sad');
                for (let k = 0; k < resultsList[1].tracks.length; k++) {
                    let randomTrack = resultsList[1].tracks[`${Math.floor(Math.random() * 5)}`];
                    divSong.appendChild(document.createTextNode(randomTrack.title));
                    divArtist.appendChild(document.createTextNode(randomTrack.artist));
                    ifrRes.setAttribute('src', `https://youtube.com/embed/${randomTrack.link}`);
                    divVideo.appendChild(ifrRes);
                    divDescription.appendChild(document.createTextNode(randomTrack.trackDescription));
                    console.log(randomTrack.title) ;
                    break;      
                }
            // Si ANGRY es mayor...
            } else if ((angryCount > happyCount) && (angryCount > sadCount) && (angryCount > boredCount)) {
                console.log('angry');
                for (let k = 0; k < resultsList[2].tracks.length; k++) {
                    let randomTrack = resultsList[2].tracks[`${Math.floor(Math.random() * 5)}`];
                    divSong.appendChild(document.createTextNode(randomTrack.title));
                    divArtist.appendChild(document.createTextNode(randomTrack.artist));
                    ifrRes.setAttribute('src', `https://youtube.com/embed/${randomTrack.link}`);
                    divVideo.appendChild(ifrRes);
                    divDescription.appendChild(document.createTextNode(randomTrack.trackDescription));
                    console.log(randomTrack.title);
                    break;        
                }
            // Si BORED es mayor...
            } else if ((boredCount > happyCount) && (boredCount > sadCount) && (boredCount > angryCount)) {
                console.log('bored')
                for (let k = 0; k < resultsList[3].tracks.length; k++) {
                    let randomTrack = resultsList[3].tracks[`${Math.floor(Math.random() * 5)}`];
                    divSong.appendChild(document.createTextNode(randomTrack.title));
                    divArtist.appendChild(document.createTextNode(randomTrack.artist));
                    ifrRes.setAttribute('src', `https://youtube.com/embed/${randomTrack.link}`);
                    divVideo.appendChild(ifrRes);
                    divDescription.appendChild(document.createTextNode(randomTrack.trackDescription));     console.log(randomTrack.title)   ;
                    break;     
                }
            }

            // Agrega otro botón para ir a la siguiente canción random
            btnOtherTrack.addEventListener('click', () => {
                divSong.innerHTML = "";
                divArtist.innerHTML = "";
                divVideo.innerHTML = "";
                divDescription.innerHTML = "";
            })
            btnOtherTrack.addEventListener('click', () => {
                requestResults(showVideo);
                },
            {once: true}
            );
            btnOtherTrack.style.display = "inline-block";

            // TO DO : AGREGAR BOTÓN PARA JUGAR NUEVAMENTE
            // Agrega el botón para jugar de nuevo
            // btnAgain.addEventListener('click', () => {
            //     divQuestion.innerHTML = "";
            //     divSong.innerHTML = "";
            //     divArtist.innerHTML = "";
            //     divVideo.innerHTML = "";
            //     divDescription.innerHTML = "";
            //     thirdSection.style.display = "none";
            //     secondSection.style.display = "block";            
            // });
            // btnAgain.addEventListener('click', () => {
            //     requestQuestions(showQuestion);
            //     },
            // {once: true}
            // );
            // btnAgain.style.display = "inline-block";
        }
}