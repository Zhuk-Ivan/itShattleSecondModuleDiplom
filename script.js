import "./style.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import confetti from 'canvas-confetti';
import Swal from "sweetalert2";

let userName = document.getElementById('user-full-name');
let modal = document.getElementById('modal');
let wrapper = document.getElementById('wrapper');
let modalButton = document.getElementById('modal-button');
let cancelButton = document.getElementById('cancelModal');
let firstAnswer, secondAnswer, thirdAnswer, fourthAnswer, fifthAnswer, sixthAnswer, seventhAnswer, eighthAnswer;

window.onload = function() {
    let user = localStorage.getItem("user");
    let answers = localStorage.getItem('userAnswers');
    let userObj;
    if (user){
        document.getElementById('authentication').style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
        userObj = JSON.parse(user);
        userName.textContent = userObj.name + ' ' + userObj.surname;
    }

    if(answers){
        document.getElementById('modal-button').style.display = 'block';
    }
};

function plusProgress(){
    let progress = Number.parseFloat(progressBar.getAttribute('aria-valuenow'));
    let currentProgress = progress + 12.5;
    progressBar.style.width = currentProgress + '%';
    progressBar.innerText = currentProgress + '%'
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function minusProgress(){
    let progress = Number.parseFloat(progressBar.getAttribute('aria-valuenow'));
    let currentProgress = progress - 12.5;
    progressBar.style.width = currentProgress + '%';
    progressBar.innerText = currentProgress + '%'
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function setAnswers(){
    let userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    document.getElementById('firstAnswer').innerText = userAnswers.firstQuestion.toLowerCase();
    document.getElementById('secondAnswer').innerText = userAnswers.secondQuestion.join(' , ').toLowerCase();
    document.getElementById('thirdAnswer').innerText = userAnswers.thirdQuestion;
    document.getElementById('fourthAnswer').innerText = userAnswers.fourthQuestion;
    document.getElementById('fifthAnswer').innerText = userAnswers.fifthQuestion;
    document.getElementById('sixthAnswer').innerText = userAnswers.sixthQuestion;
    if (userAnswers.seventhQuestion === 'Нет'){
        document.getElementById('seventhAnswer').innerText = 'не следите';
    }else{
        document.getElementById('seventhAnswer').innerText = 'следите';
    }

    document.getElementById('eighthAnswer').innerText = userAnswers.eighthQuestion.join(' , ').toLowerCase();
};

let authentication = document.getElementById('auth');
authentication.addEventListener('click', function(){
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('last-name').value;
    let age = document.getElementById('age').value;

    if (name && lastName && age){
        let user = { 
            'name': name, 
            'surname': lastName, 
            'age': age 
        };

        localStorage.setItem('user', JSON.stringify(user));
        document.getElementById('authentication').style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
        userName.textContent = name + ' ' + lastName;
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Введите все значения, чтобы пройти опрос!',
          })
    }
});


let questionnaireForm = document.getElementById('questionnaire-form');
let progressBar = document.querySelector('.progress-bar');

let firstQuestionRadios = questionnaireForm.elements["cinema-attendance"];
let firstQuestion = document.getElementById('firstQuestion');
 for(let i = 0; i < firstQuestionRadios.length; i++) {
    firstQuestionRadios[i].onclick = function() {
        firstAnswer = firstQuestionRadios[i].value;
        if (firstQuestion.getAttribute('data-progress') === '0'){
            plusProgress();
            firstQuestion.setAttribute('data-progress', 1);
        }
    }
}

var secondQuestionCheckBoxes = document.querySelectorAll("input[type=checkbox][name=movie-type]");
let secondQuestion = document.getElementById('secondQuestion');
secondQuestionCheckBoxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    secondAnswer = 
      Array.from(secondQuestionCheckBoxes)
      .filter(i => i.checked) 
      .map(i => i.value) 
    
    if (secondQuestion.getAttribute('data-progress') === '0'){
        plusProgress();
    }

    if (secondAnswer.length > 0){
        secondQuestion.setAttribute('data-progress', 1);
    }else{
        minusProgress();
        secondQuestion.setAttribute('data-progress', 0);
    }
    });
});

let thirdQuestion = document.getElementById('last-memorable-movie');
let thirdQuestionBlock = document.getElementById('thirdQuestion');
thirdQuestion.addEventListener('blur', function(){
    thirdAnswer = thirdQuestion.value;

    if (thirdAnswer !== ''){
        if (thirdQuestionBlock.getAttribute('data-progress') === '0'){
            plusProgress();
            thirdQuestionBlock.setAttribute('data-progress', 1);
        }
    }else{
        if (thirdQuestionBlock.getAttribute('data-progress') === '1'){
            minusProgress();
            thirdQuestionBlock.setAttribute('data-progress', 0);
        }
    }
})

let fourthQuestion = document.getElementById('favourite-actor');
let fourthQuestionBlock = document.getElementById('fourthQuestion');
fourthQuestion.addEventListener('blur', function(){
    fourthAnswer = fourthQuestion.value;

    if (fourthAnswer){
        if (fourthQuestionBlock.getAttribute('data-progress') === '0'){
            plusProgress();
            fourthQuestionBlock.setAttribute('data-progress', 1);
        }
    }else{
        if (fourthQuestionBlock.getAttribute('data-progress') === '1'){
            minusProgress();
            fourthQuestionBlock.setAttribute('data-progress', 0);
        }
    }

})

let fifthQuestion = document.getElementById('favourite-TV-series');
let fifthQuestionBlock = document.getElementById('fifthQuestion');
fifthQuestion.addEventListener('blur', function(){
    fifthAnswer = fifthQuestion.value;

    if (fifthAnswer){
        if (fifthQuestionBlock.getAttribute('data-progress') === '0'){
            plusProgress();
            fifthQuestionBlock.setAttribute('data-progress', 1);
        }
    }else{
        if (fifthQuestionBlock.getAttribute('data-progress') === '1'){
            minusProgress();
            fifthQuestionBlock.setAttribute('data-progress', 0);
        }
    }
})

let sixthQuestion = document.getElementById('film-countries');
let sixthQuestionBlock = document.getElementById('sixthQuestion');
sixthQuestion.addEventListener('click', function(){
    sixthAnswer = sixthQuestion.options[sixthQuestion.selectedIndex].text;

    if (sixthQuestionBlock.getAttribute('data-progress') === '0'){
        plusProgress();
        sixthQuestionBlock.setAttribute('data-progress', 1);
    }

})

let seventhQuestion = questionnaireForm.elements["cannes-film-festival"];
let seventhQuestionBlock = document.getElementById('seventhQuestion');
 for(let i = 0; i < seventhQuestion.length; i++) {
    seventhQuestion[i].onclick = function() {
        seventhAnswer = seventhQuestion[i].value;
        if (seventhQuestionBlock.getAttribute('data-progress') === '0'){
            plusProgress();
            seventhQuestionBlock.setAttribute('data-progress', 1);
        }
    }
}

let eightQuestionCheckBoxes = document.querySelectorAll("input[type=checkbox][name=watching-purpose]");
let eightQuestionBlock = document.getElementById('eighthQuestion');
eightQuestionCheckBoxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    eighthAnswer = 
      Array.from(eightQuestionCheckBoxes)
      .filter(i => i.checked) 
      .map(i => i.value) 


    if (eightQuestionBlock.getAttribute('data-progress') === '0'){
        plusProgress();
    }

    if (eighthAnswer.length > 0){
        eightQuestionBlock.setAttribute('data-progress', 1);
    }else{
        minusProgress();
        eightQuestionBlock.setAttribute('data-progress', 0);
    }

    });
});

let confirm = document.getElementById('answer-questionnaire');
confirm.addEventListener('click', function(){
    if (progressBar.getAttribute('aria-valuenow') === '100'){
        let userAnswers = {
            "firstQuestion" : firstAnswer,
            'secondQuestion' : secondAnswer,
            'thirdQuestion' : thirdAnswer,
            'fourthQuestion' : fourthAnswer,
            'fifthQuestion' : fifthAnswer,
            'sixthQuestion' : sixthAnswer,
            'seventhQuestion' : seventhAnswer,
            'eighthQuestion' : eighthAnswer
        };

        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        setAnswers();
        modal.style.display = 'block';
        wrapper.style.display = 'block';
        document.getElementById('questionnaire').style.display = 'none';
        document.getElementById('modal-button').style.display = 'block';
    }else{
        Swal.fire({
            icon: 'error',
            text: 'Чтобы получить результаты, ответье на все вопросы',
          })
    }
});

    modalButton.onclick = function () {
        modal.style.display = 'block';
        wrapper.style.display = 'block';
        document.getElementById('questionnaire').style.display = 'none';
        setAnswers();
        
        var end = Date.now() + (1000);


    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }
    document.onkeydown = function(e) {
        if (e.key == 'Escape') {
        modal.style.display = 'none';
        wrapper.style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
        }
    }
    wrapper.onclick = function () {
        modal.style.display = 'none';
        wrapper.style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
    }

     cancelButton.onclick =  function () {
        modal.style.display = 'none';
        wrapper.style.display = 'none';
        document.getElementById('questionnaire').style.display = 'block';
    }
 

    