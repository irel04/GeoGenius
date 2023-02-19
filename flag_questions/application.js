//Select elements
let countSpan = document.querySelector('.count span');
let flag_imgDiv = document.querySelector('.flag-image');
let flag_img = document.querySelector('.flag-image img');
let flagOptions = document.querySelectorAll('.flag-options ul');
let flagLis = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');


let currentIndex=0;
let rightAnswer = 0;
let qCount = 1;
const Africa = [];

function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange =function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText)
            //Shuffling the questions
            
            // select_regions(questions);
            // console.log(Africa);
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, 10);
            // call the function for generate questions
            generateQuestion(questions[currentIndex], qCount);
            questionNum(qCount);

            flagLis.forEach(li => {
                li.addEventListener('click', () => {
                    let rightAnswer = questions[currentIndex].right_answer;
                    li.classList.add('active');
                    
                    // Number of items per region
                    
                    // increment index and the number of the item (qcount)
                    currentIndex++;
                    qCount++
                    
                    // Check answer after 500ms
                    setTimeout(()=>{
                        check_answer(rightAnswer, qCount);
                        questionNum(qCount)
                    }, 500);
                    setTimeout(()=>{
                        //Remove previous image 
                        flag_img.src='';
                        // Remove All Classes 
                        li.classList.remove('active');
                        li.classList.remove('success');
                        li.classList.remove('wrong');
                        // Add questions again
                        generateQuestion(questions[currentIndex], qCount);
                    }, 1000)
                })                
            })
        }
    }
    myRequest.open("GET", "questions.json", true);
    myRequest.send();

}
getQuestions();

function questionNum(num){
    countSpan.innerHTML = num
};

// This is for iterating the needed questions base on the user input
// function select_regions(questions){
//     for (i){
        
//         Africa.push(questions[i])
//         console.log(questions[i])
//     }

// }

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

function check_answer(rAnswer, count){
    let choosenAnswer;
    for (let i=0; i<flagLis.length; i++){
        if (flagLis[i].classList.contains('active')){
            choosenAnswer = flagLis[i].dataset.answer;
            if (rAnswer == choosenAnswer){;
                flagLis[i].classList.add('success');
                rightAnswer++;
                score.innerHTML = rightAnswer;
            }else {
                flagLis[i].classList.add('wrong');
            }
        }
    }
   
}