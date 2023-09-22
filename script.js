let userNum1 = ""
let userNum2 = ""
let userOperator = ""

const auxDisplay = document.querySelector(".aux-display")
const display = document.querySelector(".display")
const buttonNumber = document.querySelectorAll(".buttonNumber")
const buttonOperator = document.querySelectorAll(".buttonOperator")

const buttonDot = document.querySelector(".buttonDot")
const buttonBackspace = document.querySelector(".buttonBackspace")
const buttonEqual = document.querySelector(".buttonEqual")
const buttonClear = document.querySelector(".buttonClear")

document.addEventListener("keydown", (event)=>{
    event.preventDefault()
    handlerKeydown(event)
})
for (let i = 0; i < buttonNumber.length; i++) {
    buttonNumber[i].addEventListener("click", (event)=>{
        handlerNumbers(event)
    })
}
for (let i = 0; i < buttonOperator.length; i++) {
    buttonOperator[i].addEventListener("click", (event) => {
        handlerOperators(event)
    });
}

buttonDot.addEventListener("click", handlerDot)
buttonBackspace.addEventListener("click", handlerBackspace)
buttonEqual.addEventListener("click", handlerEqualEnter)
buttonClear.addEventListener("click", handlerClearCalculator)


function handlerDot(){
    let temp = display.innerText
    if(temp == "Error"){clearDisplay()}
    if(temp.includes(".") == false && display.innerText != ""){
        addOnDisplay(".")
    }
}
function handlerBackspace(){
    display.innerText = display.innerText.slice(0,-1)
}
function handlerEqualEnter(){
    if(display.innerText == "Error") {handlerClearCalculator()}
    if(userNum1 != "" && display.innerText != "" ) {
        userNum2 = display.innerText 
        auxDisplay.innerText += userNum2 + "="
        clearDisplay()
        display.innerText = runOperation(userNum1, userNum2)
        userNum1 = ""
        userNum2 = ""
    }
}
function handlerClearCalculator(){
    clearAuxDisplay()
    display.innerText = 0
    userNum2 = ""
    userNum1 = ""
    userOperator = ""
}
function handlerKeydown(event){
    switch (event.key) {
        case ".":
            handlerDot()
            break;
        case "Backspace":
            handlerBackspace()
            break;
        case "Enter":
            handlerEqualEnter()
            break;
        case "Delete":
            handlerClearCalculator()
            break;
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            handlerNumbers(event)
            break;
        case "+": case "-": case "*": case "/":
            handlerOperators(event)
            break;
    }
}
function handlerNumbers(event){
    let temp = display.innerText
    if(temp == "Error"){clearDisplay()}
    if(temp == 0 && !temp.includes(".")){clearDisplay()}
    if(event.type == "keydown"){addOnDisplay(event.key)}
    if(event.type == "click"){addOnDisplay(event.target.innerText)}
}
function handlerOperators(event){
    if(display.innerText == "Error"){handlerClearCalculator()}
    if(display.innerText == ""){
        if (event.type == "keydown"){userOperator = event.key};
        if (event.type == "click"){userOperator = event.target.innerText};
        auxDisplay.innerText = auxDisplay.innerText.slice(0,-1)
        addOnAuxDisplay(userOperator)
    }
    if(display.innerText != "" && userNum1 == "") {
        if (event.type == "keydown"){userOperator = event.key};
        if (event.type == "click"){userOperator = event.target.innerText};
        userNum1 = display.innerText
        clearAuxDisplay()
        auxDisplay.innerText = display.innerText + userOperator
        clearDisplay()
    }
    if(userNum1 != "" && display.innerText != "") {
        userNum2 = display.innerText
        let tempResult = runOperation(userNum1, userNum2)
        auxDisplay.innerText = tempResult
        if (event.type == "keydown"){userOperator = event.key};
        if (event.type == "click"){userOperator = event.target.innerText};
        addOnAuxDisplay(userOperator)
        clearDisplay()
        userNum1 = tempResult
        userNum2 = ""
    }
}

function runOperation(a,b){
    let result
    a = +a;
    b = +b;
    switch (userOperator) {
        case "+":
            result = a + b
            break;
        case "-":
            result = a - b
            break;
        case "*":
            result = a * b
            break;
        case "/":
            if(b == 0){return result = "Error"}
            result = a / b
            break;
    }
    
    result = parseFloat(result.toFixed(9))
    return result
}

function clearDisplay(){
    display.innerText = "";
}

function clearAuxDisplay(){
    auxDisplay.innerText = "";
}

function addOnDisplay(toDisplay){
    display.innerText += toDisplay
}

function addOnAuxDisplay(toDisplay){
    auxDisplay.innerText += toDisplay
}
