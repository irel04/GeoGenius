const select_category = document.getElementsByClassName("box");
select_category[0].addEventListener('click', ()=>{
    window.location='flag_questions/flag_questions.html'
    sessionStorage.setItem('category', 'Maps')
})
select_category[1].addEventListener('click', ()=>{
    window.location='flag_questions/flag_questions.html'
    sessionStorage.setItem('category', 'Capital')
})
select_category[2].addEventListener('click', ()=>{
    window.location='flag_questions/flag_questions.html'
    sessionStorage.setItem('category', 'Flags')
})