//Select elements
let countSpan = document.querySelector('.count span');
let imgDiv = document.querySelector('.image');
let question_image = document.querySelector('.image img');
let QOptions = document.querySelectorAll('.options ul');
let QLis = document.querySelectorAll('.options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns = document.querySelector('.score .right span');
let category_header = document.querySelector('.header h1')

// Change the value to navigate from the regions and category
let chosen_region = "Asia";
let choosenCategory = "Flags";

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
                region_selector(questions, choosenCategory)
                questions = Africa.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Asia"){
                region_selector(questions, choosenCategory)
                questions = Asia.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Europe"){
                region_selector(questions, choosenCategory)
                questions = Europe.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "North and South America"){
                region_selector(questions, choosenCategory)
                questions = North_South_America.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            else if (chosen_region == "Oceania"){
                region_selector(questions, choosenCategory)
                questions = Oceania.sort(() => Math.random() - Math.random()).slice(0, 10)
            }
            
            // call the function for generate questions
            generateQuestion(questions[currentIndex], qCount, chosen_region, choosenCategory);
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
                            generateQuestion(questions[currentIndex], qCount, chosen_region, choosenCategory);
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
function region_selector(questions, category){
    // THis will determine what intervals that should be selected on the qjson
    console.log(questions[50])
    let q_range = 0
    let starting_range = 0
    if(category == "Flags"){
        q_range = 10;
        category_header.innerHTML = "GUESS THE FLAGS"

    }
    else if(category == "Maps"){
        q_range = 60;
        category_header.innerHTML = "GUESS THE COUNTRY"
        console.log(question_image.style)
        starting_range = 50
    }
    else if (category == "Capital"){

    }
    
    // This will separate questions based on the set interval of the choosen category
    if (chosen_region == "Africa"){
        for (starting_range; starting_range < q_range; starting_range++){
            Africa.push(questions[starting_range])
        }
        console.log(Africa)
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
    

function generateQuestion(obj, count, region, category){
    if(currentIndex < count){
        question_image.src= `${region}/${category}/${obj.img}`;
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
};

