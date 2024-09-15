const questions=[

{
    que:"Which type of JavaScript language is ___",
    ans:[
        { text:"Object-Oriented",correct:false},
        { text:"Object-Based",correct:true},
        { text:"Assembly-language",correct:false},
        { text:"High-level",correct:false}
    ]
},
{
    que:"Which one of the following also known as Conditional Expression:",
    ans:[
        { text:"Alternative to if-else",correct:false},
        { text:"Switch statement",correct:false},
        { text:"If-then-else statement",correct:false},
        { text:"immediate if",correct:true}
    ]
},
{
    que:"The function and  var are known as:",
    ans:[
        { text:"Keywords",correct:false},
        { text:"Data types",correct:false},
        { text:"Declaration statements",correct:true},
        { text:"Prototypes",correct:false}
    ]
},
{
    que:"Which of the following variables takes precedence over the others if the names are the same?",
    ans:[
        { text:"Global variable",correct:false},
        { text:"The local element",correct:true},
        { text:"The two of the above",correct:false},
        { text:"None of the above",correct:false}
    ]
},
{
    que:"Which of the following option is used as hexadecimal literal beginning?",
    ans:[
        { text:"00",correct:false},
        { text:"0x",correct:false},
        { text:"0X",correct:false},
        { text:"Both 0x and 0X",correct:true}
    ]
}
];

const questElement=document.getElementById("question");
const ansElement=document.getElementById("answer");
const nextElement=document.getElementById("next-btn");

let currQuesIndex=0;
let score=0;

function startQuiz(){
    currQuesIndex=0;
    score=0;
    nextElement.innerHTML="Next";
    showQuest();
}

function showQuest(){
    resetState();
    let currQues=questions[currQuesIndex];
    let quesNo=currQuesIndex+1;
    questElement.innerHTML=quesNo+". "+currQues.que;

    currQues.ans.forEach(answers=>{
        const button=document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        ansElement.appendChild(button);
        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener("click",selectAns);
    });
}
function resetState(){
    nextElement.style.display="none";
    while(ansElement.firstChild){
        ansElement.removeChild(ansElement.firstChild);
    }
}
function selectAns(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextElement.style.display="block";
}


function showScore(){
    resetState();
    questElement.innerHTML=`your scored ${score} out of ${questions.length}!`;
    nextElement.innerHTML="Play Again";
    nextElement.style.display="block";
}

function handleNextButton(){
    currQuesIndex++;
    if(currQuesIndex<questions.length){
        showQuest();
    }else{
        showScore();
    }
}

nextElement.addEventListener("click",()=>{
    if(currQuesIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();