function getQuestions(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange =function(){
        if(this.readyState === 4 && this.status === 200){
            let questions = JSON.parse(this.responseText)
        }
    }
    
}