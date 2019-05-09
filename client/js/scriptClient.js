window.onload = function() {
    loadName();
    showQuestion()
}

function loadName() {
    let nameInput = document.getElementById("nameInput");
    let nameTag = document.getElementById("nameTag");
    let buttonStart = document.getElementById("buttonStart");
    let start = document.getElementById("start");
    buttonStart.addEventListener("click", () => {
        nameTag.innerText = `Bienvenid@ ${nameInput.value}`;
        start.style.display = "none"
    })
}

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

function nextQuestion() {

}

function moodResult() {
    let happy = 0;
    let sad = 0;
    let angry = 0;
    let bored = 0;


}