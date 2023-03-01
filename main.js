//Select elements
let question_container = document.querySelector('.container');
let countSpan = document.querySelector('.count span');
let imgDiv = document.querySelector('.image');
let question_image = document.querySelector('.image img');
let QOptions = document.querySelectorAll('.options ul');
let QLis = document.querySelectorAll('.options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let category_header = document.querySelector('.header h1')
let summaryDiv = document.getElementsByClassName('summary');
let summary_score = document.querySelector('#total_score span');
let timeLeft = document.querySelector(".time-left");
let dropdownBtn = document.querySelector(".btn");
let dropdownMenu = document.querySelector('.settings');
let proceed = document.querySelector('#choose_next')
let correct_sfx = new Audio()
correct_sfx.src = 'flag_questions/completetask_0.mp3';
let wrong_sfx =  new Audio();
wrong_sfx.src = 'flag_questions/wrong_sound_effect.mp3';
let more_info_bttn = document.querySelector('#more_info');
let more_info_span = document.querySelector('#more_info span');
let trivia_div = document.querySelector('.trivia_container');
let trivia = document.querySelector('#trivia');
let trivia_h3 = document.querySelector('.trivia_container h3');
// time to pause next question
let my_interval = 1000;

//Tic toc
let tic_toc = new Audio();
tic_toc.src = 'flag_questions/Tick.mp3'

//bg music
let bg_music = new Audio();
bg_music.src = 'flag_questions/HouseForest.mp3'

// Change the value to navigate from the regions and category
let chosen_region = sessionStorage.getItem('region');
let chosenCategory = sessionStorage.getItem('category');

// Storage variable for number of items and total points
let currentIndex=0;
let number_of_correct = 0;
let qCount = 1;

let new_score = localStorage.getItem('new_score');




// Selecting difficulty function()
function selected_difficulty (){
    if (sessionStorage.getItem('difficulty') == 'Easy'){
        return 21
    }
    else if (sessionStorage.getItem('difficulty') == 'Medium'){
        return 11
    }
    else if (sessionStorage.getItem('difficulty') == 'Hard'){
        return 6
    }
    
    
}

// Setting the timer
let count = selected_difficulty();
let countDown;

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

let click_SF = new Audio();
click_SF.src = 'click.wav';

// Dropdown Button
dropdownBtn.addEventListener('click', () => {
    click_SF.play()
    // Get dropdown settings and hide class
    dropdownMenu.classList.toggle('hide');
});

// Timer
function timerDisplay(q_parameter){
    countDown = setInterval(() => {

        if (count > 0){
            tic_toc.play();
            count--;
        }
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            currentIndex++;
            qCount++;
            generateQuestion(q_parameter[currentIndex], chosen_region, chosenCategory);
            questionNum(qCount)

            if (currentIndex < 10) {
                count = selected_difficulty()
            }

            if (currentIndex == 10){
                console.log('True')
                question_components = document.getElementsByClassName('content')
                question_components[0].style.display ='None'
                question_components[1].style.display ='None'
                summaryDiv[0].style.display='flex';
                summary_score.innerHTML = number_of_correct;
                count = 0;
                accumulated = parseFloat(new_score) + number_of_correct
                localStorage.setItem('new_score', accumulated);
                console.log(localStorage.getItem('new_score'));
                choose_nextContinent();

                if(chosen_region == 'Africa'){
                    more_info_span.innerHTML = 'Africa'
                }
                else if(chosen_region == 'Asia'){

                    more_info_span.innerHTML = 'Asia'
                }
                else if(chosen_region == 'Europe'){
                    more_info_span.innerHTML = 'Europe'
                }
                else if(chosen_region == 'North and South America'){
                    more_info_span.innerHTML = 'America'
                }
                else if(chosen_region == 'Oceania'){
                    more_info_span.innerHTML = 'Oceania'
                }

                //event listener for more info
                more_info.addEventListener('click', ()=>{
                    if(chosen_region == 'Africa'){
                        window.location = 'https://education.nationalgeographic.org/resource/africa-physical-geography/'
                    }
                    else if(chosen_region == 'Asia'){
                        window.location = 'https://education.nationalgeographic.org/resource/asia/'
                    }
                    else if(chosen_region == 'Europe'){
                        window.location = 'https://education.nationalgeographic.org/resource/europe-physical-geography/'
                    }
                    else if(chosen_region == 'North and South America'){
                        window.location = 'https://www.nationsonline.org/oneworld/america.htm'
                    }
                    else if(chosen_region == 'Oceania'){
                        window.location = 'https://education.nationalgeographic.org/resource/oceania-physical-geography/'
                    }
                
                })

                //Ending 
                if (sessionStorage.getItem('ending')==0){
                    if(localStorage.getItem('new_score') > 160){
                        window.location = 'storyline_ending.html'
                        sessionStorage.setItem('ending', 1)
                    }
                }
    } 
        }
    }, 1000);
}


function getQuestions(){
    bg_music.volume = 0.3;    
    bg_music.play()
    bg_music.loop = true;
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange =function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText)
            //Shuffling the questions
            if(chosen_region == "Africa"){
                region_selector(questions, chosenCategory)
                questions = Africa.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Asia"){
                region_selector(questions, chosenCategory)
                questions = Asia.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Europe"){
                region_selector(questions, chosenCategory)
                questions = Europe.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "North and South America"){
                region_selector(questions, chosenCategory)
                questions = North_South_America.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Oceania"){
                region_selector(questions, chosenCategory)
                questions = Oceania.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            
            // call the function for generate questions
            generateQuestion(questions[currentIndex], chosen_region, chosenCategory)
            questionNum(qCount);
            timerDisplay(questions);
            QLis.forEach(li => {
                li.addEventListener('click', () => {
                    let rightAnswer = questions[currentIndex].right_answer;
                    console.log(rightAnswer)
                    li.classList.add('active');
                    
                    // Check answer after 500ms
                    setTimeout(()=>{
                        check_answer(rightAnswer, questions[currentIndex-1]);
                        questionNum(qCount);
                    }, 500);
                    

                    
                    if (currentIndex + 1 < 10){
                        // increment index and the number of the item (qcount)
                        currentIndex++;
                        qCount++
                        setTimeout(()=>{
                            //Remove previous image 
                            question_image.src='';
                            // Remove All Classes 
                            li.classList.remove('active');
                            li.classList.remove('success');
                            li.classList.remove('wrong');
                            // Add questions again
                            generateQuestion(questions[currentIndex], chosen_region, chosenCategory);
                            timerDisplay();
                            count = selected_difficulty();
                            clearInterval(countDown);
                        }, 4001)
                    }
                    else if (currentIndex + 1 == 10){
                        setTimeout(() => {
                            question_components = document.getElementsByClassName('content')
                            question_components[0].style.display ='None'
                            question_components[1].style.display ='None'
                            summaryDiv[0].style.display='flex';
                            summary_score.innerHTML = number_of_correct;
                            count = 0;
                            accumulated = parseFloat(new_score) + number_of_correct
                            localStorage.setItem('new_score', accumulated);
                            console.log(localStorage.getItem('new_score'));
                            choose_nextContinent();
                            
                            if(chosen_region == 'Africa'){
                                more_info_span.innerHTML = 'Africa'
                            }
                            else if(chosen_region == 'Asia'){
            
                                more_info_span.innerHTML = 'Asia'
                            }
                            else if(chosen_region == 'Europe'){
                                more_info_span.innerHTML = 'Europe'
                            }
                            else if(chosen_region == 'North and South America'){
                                more_info_span.innerHTML = 'America'
                            }
                            else if(chosen_region == 'Oceania'){
                                more_info_span.innerHTML = 'Oceania'
                            }
            
                            //event listener for more info
                            more_info.addEventListener('click', ()=>{
                                if(chosen_region == 'Africa'){
                                    window.location = 'https://education.nationalgeographic.org/resource/africa-physical-geography/'
                                }
                                else if(chosen_region == 'Asia'){
                                    window.location = 'https://education.nationalgeographic.org/resource/asia/'
                                }
                                else if(chosen_region == 'Europe'){
                                    window.location = 'https://education.nationalgeographic.org/resource/europe-physical-geography/'
                                }
                                else if(chosen_region == 'North and South America'){
                                    window.location = 'https://www.nationsonline.org/oneworld/america.htm'
                                }
                                else if(chosen_region == 'Oceania'){
                                    window.location = 'https://education.nationalgeographic.org/resource/oceania-physical-geography/'
                                }})

                            //Ending 
                            if (sessionStorage.getItem('ending')==0){
                                if(localStorage.getItem('new_score') > 160){
                                    window.location = 'storyline_ending.html'
                                    sessionStorage.setItem('ending', 1)
                                }
                            }
                        }, 5001);

                    }
                    
                })                
            })
            
        }
    }
    myRequest.open("GET", "flag_questions/questions.json", true);
    myRequest.send();
}
getQuestions();

function choose_nextContinent(){
    proceed.addEventListener('click', ()=>{
        window.location = 'region.html'
    })

}

function questionNum(num){
    if(currentIndex < 10){
        countSpan.innerHTML = num
    }
};

// This is for iterating the needed questions base on the user input
function region_selector(questions, category){
    // THis will determine what intervals that should be selected on the qjson
    let q_range = 0
    let starting_range = 0
    if(category == "Flags"){
        q_range = 10;
        category_header.innerHTML = "GUESS THE FLAGS"

    }
    else if(category == "Maps"){
        q_range = 60;
        category_header.innerHTML = "GUESS THE COUNTRY"
        starting_range = 50
    }
    else if (category == "Capital"){
        q_range = 110;
        category_header.innerHTML = "GUESS THE CAPITAL"
        starting_range = 100
    }
    
    // This will separate questions based on the set interval of the choosen category
    if (chosen_region == "Africa"){
        for (starting_range; starting_range < q_range; starting_range++){
            Africa.push(questions[starting_range])
        }
    }
    else if (chosen_region == "Asia"){
        starting_range += 10;
        for (starting_range; starting_range < q_range + 10; starting_range++){
            Asia.push(questions[starting_range])
        }
    }
    else if (chosen_region == "Europe"){
        starting_range += 20;
        for (starting_range; starting_range < q_range + 20; starting_range++){
            Europe.push(questions[starting_range])
        }
    }
    else if (chosen_region == "North and South America"){
        starting_range += 30;
        for (starting_range; starting_range < q_range + 30; starting_range++){
            North_South_America.push(questions[starting_range])
        }
    }
    else if (chosen_region == "Oceania"){
        starting_range += 40;
        for (starting_range; starting_range < q_range + 40; starting_range++){
            Oceania.push(questions[starting_range])
        }
    }
    }
    

function generateQuestion(obj,region, category){
    if(currentIndex < 10){
        question_image.src= `flag_questions/${region}/${category}/${obj.img}`;
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

function check_answer(rAnswer, obj){
    let choosenAnswer;
    for (let i=0; i<QLis.length; i++){
        if (QLis[i].classList.contains('active')){
            choosenAnswer = QLis[i].dataset.answer;
            if (rAnswer == choosenAnswer){;
                QLis[i].classList.add('success');
                number_of_correct ++;
                correct_sfx.play()
                score.innerHTML = number_of_correct;
                trivia_div.style.display = 'flex';
                trivia_h3.innerHTML = 'Did you know?'
                trivia.innerHTML = obj.q_trivia;
                setTimeout(() => {
                    trivia_div.style.display = 'none';
                }, 3000);
                
            }else {
                QLis[i].classList.add('wrong');
                wrong_sfx.volume = 0.1;
                wrong_sfx.play()
                trivia_div.style.display = 'flex';
                trivia_h3.innerHTML = "Correct Answer:"
                trivia.innerHTML = obj.right_answer;
                setTimeout(() => {
                    trivia_div.style.display = 'none';
                }, 3000);
            }
        }
    }  
};