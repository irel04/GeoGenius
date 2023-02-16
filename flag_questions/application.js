//Select elements
let countSpan = document.querySelector('.count span');
let flag_imgDiv = document.querySelector('.flag-image');
let flag_img = document.querySelector('.flag-image img')


function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange =function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText)
            console.log(questions)
            // Number of items per region
            let qCount = 1;
            questionNum(qCount)
        }
    }
    myRequest.open("GET", "questions.json", true);
    myRequest.send();

}
getQuestions();

function questionNum(num){
    countSpan.innerHTML = num
}