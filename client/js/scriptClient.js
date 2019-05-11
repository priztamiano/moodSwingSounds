window.onload = function() {
    loadName();
    showQuestion()
}

// Función que carga el nombre de user al clickear el primer botón
function loadName() {
    let nameInput = document.getElementById("nameInput");
    let nameTag = document.getElementById("nameTag");
    let buttonStart = document.getElementById("buttonStart");
    let pName = document.getElementById("pName");
    buttonStart.addEventListener("click", () => {
        nameTag.innerText = `Bienvenidx ${nameInput.value}`;
        let buttonNext = document.getElementById("buttonNext");
        buttonNext.style.display = "inline-block";
    })
}



// Función que muestra la primer pregunta
function showQuestion() {
    let request = new XMLHttpRequest();
    request.open('GET', '/questions');
    request.send();
    request.onload = () => {
        buttonStart.addEventListener("click", () => {
            let question = document.getElementById("question");
            console.log(request.responseText);
        })
    }
    
}

// Función que muestra la siguiente pregunta al hacer click en el botón
function nextQuestion() {
    buttonNext.addEventListener('click', () => {

    })
}

function moodResult() {
    let happy = 0;
    let sad = 0;
    let angry = 0;
    let bored = 0;
}