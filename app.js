const lengthDisplay=document.querySelector('#displayLength');
const inputSlider=document.querySelector('#rangeSlider');

const displayPassword=document.querySelector('#displayPassword');
const copyBtn=document.querySelector('#copyBtn');
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercase=document.querySelector('#uppercase');
const lowercase=document.querySelector('#lowercase');
const number=document.querySelector('#number');
const symbol=document.querySelector('#symbol');
const generateBtn=document.querySelector('#generateBtn');

const allCheckBox=document.querySelectorAll('input[type=checkbox]');
let string="`~!@#$%^&*()_-+=\|]}[{;:'/?.>,<";

let password="";
let passwordLength=10;
let checkCount=0;


handleSlider();

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;   
}

function getRandomInteger(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,91));
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateSymbol(){
    const randNum=getRandomInteger(0,string.length);
    return string.charAt(randNum);
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copyMsg.innerHTML="copied";
    }
    catch(err){
        copyMsg.innerHTML="Failed";
    }

    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000); 
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(displayPassword.value){
        copyContent();
    }
});

function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

generateBtn.addEventListener('click', ()=>{
    //none of the checkbox is selected
    if(checkCount==0){
        return;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    password="";

    // if(uppercase.checked){
    //     password+=generateUpperCase;
    // }

    // if(lowercase.checked){
    //     password+=generateLowerCase;
    // }

    // if(number.checked){
    //     password+=generateRandomNumber;
    // }

    // if(symbol.checked){
    //     password+=generateSymbol;
    // }

    let funArr=[];

    if(uppercase.checked){
        funArr.push(generateUpperCase);
    }

    if(lowercase.checked){
        funArr.push(generateLowerCase);
    }

    if(number.checked){
        funArr.push(generateRandomNumber);
    }

    if(symbol.checked){
        funArr.push(generateSymbol);
    }

    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }

    for(let i=0;i<passwordLength-funArr.length;i++){
        let randIndex=getRandomInteger(0,funArr.length);
        password+=funArr[randIndex]();
    }

    //shuffle password;

    password=shufflePassword(Array.from(password));

    displayPassword.value=password;


});