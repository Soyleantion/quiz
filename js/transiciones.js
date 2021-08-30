/* obtener requerimientos */
const startBtn= document.querySelector(".start_btn button");
const infoBox= document.querySelector(".info_box");
const exitBtn= infoBox.querySelector(".buttons .quit");
const continueBtn= infoBox.querySelector(".buttons .restart");
const quizBox= document.querySelector(".quiz_box");

const timeCount = quizBox.querySelector(".timer .timer_sec");
const timeLine = quizBox.querySelector("header .time_line");
const timeOff = quizBox.querySelector("header .time_text")
const optionList = document.querySelector(".option_list");

//Click en startBtn
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo"); //Muestra la información
}

//Click en exitBtn
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");//Oculta la información
}

//Click en continueBtn
continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");//Oculta la información y vuelve al inicio
    quizBox.classList.add("activeQuiz");//Muestra el quiz
    showQuestions(questionCount);
    questionsCounter(questionNumb);
    startTimer(timeValue);
    startTimerLine(timeValue);
}

let questionCount = 0;
let questionNumb = 1;
let counter;
let counterLine;
let timeValue = 19;
let widthValue = 0;
let userScore = 0;
let scorePercent = 0;

const nextBtn=quizBox.querySelector(".next_btn");
const resultBox = document.querySelector(".result_box");
const restartQuiz= resultBox.querySelector(".buttons .restart");
const quitQuiz= resultBox.querySelector(".buttons .quit");


quitQuiz.onclick = () =>{
    window.location.reload();
}

/* restartQuiz.onclick = () =>{
    window.location.reload();
} */


//Pasando de pregunta
nextBtn.onclick = ()=>{
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumb++;
        showQuestions(questionCount);
        questionsCounter(questionNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeOff.textContent = "Tiempo restante"
    }
    else{
        clearInterval(counter); 
        clearInterval(counterLine);
        console.log("Preguntas completas");
        showResultBox();
    }
}

//Recibiendo preguntas y respuestas desde el array preguntas
function showQuestions(index){
    const queText = document.querySelector(".que_text");
    
    let queTag = '<span>'+ questions[index].numb +". "+ questions[index].question +'</span>';
    let optionTag= '<div class="option"><span>'+questions[index].options[0]+'</span></div>'
                    +'<div class="option"><span>'+questions[index].options[1]+'</span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i ++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div> ';
let crossIcon = ' <div class="icon cross"><i class="fas fa-times"></i></div> ';


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
   
    let userAns = answer.textContent;
    let correctAns= questions[questionCount].answer;
    let allOptions = optionList.children.length;
    
    console.log("Respuesta usuario:"+userAns);
    console.log("Respuesta Correcta:"+correctAns);

    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Respuesta correcta");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Respuesta incorrecta");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //Mostrar respuesta correcta
        for (let i = 0; i < allOptions; i ++){
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
            }
        }
    }

   /*  Deshabilitar opciones cuando se escoja una */
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disable");
    }
    nextBtn.style.display = "block";
}

function showResultBox(){
    infoBox.classList.remove("activeInfo");//Oculta la información y vuelve al inicio
    quizBox.classList.remove("activeQuiz");//Oculta el quiz
    resultBox.classList.add("activeResult"); //Muestra el resultado
    const scoreText = resultBox.querySelector(".score_text");
    scorePercent = (userScore/questions.length)*100;
    if(userScore >= 8){
        let scoreTag = '<span>Felicitaciones, tuviste <p>'+ userScore +'</p>de<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

    else if(userScore >= 5){
        let scoreTag = '<span>Bien, tuviste <p>'+ userScore +'</p>de<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore < 5){
        let scoreTag = '<span>Lo siento, tuviste <p>'+ userScore +'</p>de<p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if (time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent  = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent ="Tiempo agotado";

            let correctAns= questions[questionCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i ++){
                if(optionList.children[i].textContent == correctAns){
                    optionList.children[i].setAttribute("class", "option correct");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disable");
            }
            nextBtn.style.display = "block";
            
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 38.7);
    function timer(){
        time+=1;
        timeLine.style.width = time + "px";
        if (time > 549){
            clearInterval(counterLine);
        }
    }
}

//Cambiando el contador de preguntas

function questionsCounter(index){
    const bottomQuestionCounter= quizBox.querySelector(".total_que");
    let totalQuestCountTag = '<span><p>'+ questionNumb +'</p>de<p>'+ questions.length +'</p>Preguntas</span>';
    bottomQuestionCounter.innerHTML = totalQuestCountTag;
}