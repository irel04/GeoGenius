//Select elements
let countSpan = document.querySelector('.count span');
let flag_imgDiv = document.querySelector('.flag-image');
let flag_img = document.querySelector('.flag-image img');
let flagOptions = document.querySelectorAll('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let currentIndex=0;


function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange =function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText)
            console.log(questions)
            // Number of items per region
            let qCount = 1;
            questionNum(qCount)
            // call the function for generate questions
            generateQuestion(questions[currentIndex], qCount)
        }
    }
    myRequest.open("GET", "questions.json", true);
    myRequest.send();

}
getQuestions();

function questionNum(num){
    countSpan.innerHTML = num
}

function generateQuestion(obj, count){
    if(currentIndex < count){
        flag_img.src= `Africa/Flags/${obj.img}`;
        // for generating options
        flagLis.forEach((li, i) => {
            // dynamic id of every list
            li.id = `answer_${i+1}`
            // dynamic attribute of list
            li.dataset.answer=obj[`options`][i]
            // insert the option in the li
            li.innerHTML = obj[`options`][i];
        })
    }
}