//Select elements
let countSpan = document.querySelector('.count span');
let imgDiv = document.querySelector('.image');
let question_image = document.querySelector('.image img');
let QOptions = document.querySelectorAll('.options ul');
let QLis = document.querySelectorAll('.options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let chosen_region = "Africa"

function flag_category(){ 
     let currentIndex=0;
     let rightAnswer = 0;
     let qCount = 1;
 
     //Africa array for the question
     let Africa = [];
 
     // Asia array for the question
     let Asia =[];
 
     // Europe array for the question
     let Europe =[];
 
     // North_South_America array for the question
     let North_South_America =[];
 
     // Ocenia array for the question
     let Oceania =[];
 
     function getQuestions(){
         let myRequest = new XMLHttpRequest();
         myRequest.onreadystatechange =function(){
             if(this.readyState === 4 && this.status === 200){
                 let questions = JSON.parse(this.responseText)
                 //Shuffling the questions
                 
                 if(chosen_region == "Africa"){
                     region_selector(questions)
                     questions = Africa.sort(() => Math.random() - Math.random()).slice(0, 10)
                 }
                 else if (chosen_region == "Asia"){
                     region_selector(questions)
                     questions = Asia.sort(() => Math.random() - Math.random()).slice(0, 10)
                 }
                 else if (chosen_region == "Europe"){
                     region_selector(questions)
                     questions = Europe.sort(() => Math.random() - Math.random()).slice(0, 10)
                 }
                 else if (chosen_region == "North and South America"){
                     region_selector(questions)
                     questions = North_South_America.sort(() => Math.random() - Math.random()).slice(0, 10)
                 }
                 else if (chosen_region == "Oceania"){
                     region_selector(questions)
                     questions = Oceania.sort(() => Math.random() - Math.random()).slice(0, 10)
                 }
                 
                 // call the function for generate questions
                 generateQuestion(questions[currentIndex], qCount, chosen_region);
                 questionNum(qCount);
 
                 QLis.forEach(li => {
                     li.addEventListener('click', () => {
                         let rightAnswer = questions[currentIndex].right_answer;
                         li.classList.add('active');
                         
                         // Number of items per region
                         
                         // increment index and the number of the item (qcount)
                         currentIndex++;
                         if (qCount < 10) qCount++;
                         
                         // Check answer after 500ms
                         setTimeout(()=>{
                             check_answer(rightAnswer, qCount);
                             questionNum(qCount)
                         }, 500);
 
                         setTimeout(()=>{
                             if (qCount < 10){
                                 //Remove previous image 
                                 question_image.src='';
                                 // Remove All Classes 
                                 li.classList.remove('active');
                                 li.classList.remove('success');
                                 li.classList.remove('wrong');
                                 // Add questions again
                                 generateQuestion(questions[currentIndex], qCount, chosen_region);
                             }
                             else (()=>{
 
                             })
                             
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
     function region_selector(questions){
         if (chosen_region == "Africa"){
             for (let i = 0; i < 10; i++){
                 Africa.push(questions[i])
             }
         }
         else if (chosen_region == "Asia"){
             for (let i = 10; i < 20; i++){
                 Asia.push(questions[i])
             }
         }
         else if (chosen_region == "Europe"){
             for (let i = 20; i < 30; i++){
                 Europe.push(questions[i])
             }
         }
         else if (chosen_region == "North and South America"){
             for (let i = 30; i < 40; i++){
                 North_South_America.push(questions[i])
             }
         }
         else if (chosen_region == "Oceania"){
             for (let i = 40; i < 50; i++){
                 Oceania.push(questions[i])
             }
         }
         }
         
 
     function generateQuestion(obj, count, region){
         if(currentIndex < count){
             question_image.src= `${region}/Flags/${obj.img}`;
             // for generating options
             QLis.forEach((li, i) => {
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
         for (let i=0; i<QLis.length; i++){
             if (QLis[i].classList.contains('active')){
                 choosenAnswer = QLis[i].dataset.answer;
                 if (rAnswer == choosenAnswer){;
                     QLis[i].classList.add('success');
                     rightAnswer++;
                     score.innerHTML = rightAnswer;
                 }else {
                     QLis[i].classList.add('wrong');
                 }
             }
         }  
     }
}

flag_category();
