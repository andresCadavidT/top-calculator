let userNum1 = ""
let userNum2 = ""
let userOperator = ""

const auxDisplay = document.querySelector(".aux-display")
const display = document.querySelector(".display")
const buttonNumber = document.querySelectorAll(".buttonNumber")
const buttonClear = document.querySelector(".buttonClear")
const buttonOperator = document.querySelectorAll(".buttonOperator")
const buttonEqual = document.querySelector(".buttonEqual")
const buttonDot = document.querySelector(".buttonDot")
const buttonBackspace = document.querySelector(".buttonBackspace")

document.addEventListener("keydown", (event)=>{handlerKeydown(event)})

for (let i = 0; i < buttonNumber.length; i++) {
    buttonNumber[i].addEventListener("click", (event)=>{
        temp = display.innerText
        if(temp == 0 && !temp.includes(".")){clearDisplay()}
        addOnDisplay(event.target.innerText)
    })
}

for (let i = 0; i < buttonOperator.length; i++) {
    buttonOperator[i].addEventListener("click", (event) => {
        if(display.innerText == "Error"){clearCalculator()}
        if(display.innerText == ""){
            userOperator = event.target.innerText
            auxDisplay.innerText = auxDisplay.innerText.slice(0,-1)
            addOnAuxDisplay(userOperator)
        }
        if(display.innerText != "" && userNum1 == "") {
            userOperator = event.target.innerText
            userNum1 = display.innerText
            clearAuxDisplay()
            auxDisplay.innerText = display.innerText + userOperator
            clearDisplay()
        }
        if(userNum1 != "" && display.innerText != "") {
            userNum2 = display.innerText
            auxDisplay.innerText = runOperation(userNum1, userNum2) 
            addOnAuxDisplay(userOperator)
            clearDisplay()
            userNum1 = runOperation(userNum1, userNum2)
            userNum2 = ""
            userOperator = event.target.innerText
        }
    });
}

buttonBackspace.addEventListener("click", backspace)

buttonDot.addEventListener("click", dot)

buttonEqual.addEventListener("click", ()=>{
    if(display.innerText == "Error") {clearCalculator()}
    if(userNum1 != "" && display.innerText != "" ) {
        userNum2 = display.innerText 
        auxDisplay.innerText += userNum2 + "="
        clearDisplay()
        display.innerText = runOperation(userNum1, userNum2)
        userNum1 = ""
        userNum2 = ""
    }
})

buttonClear.addEventListener("click", clearCalculator)

function handlerKeydown(event){
    switch (event.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            temp = display.innerText
            if(temp == 0 && !temp.includes(".")){clearDisplay()}
            addOnDisplay(event.key)
            break;
        case "Delete":
            clearCalculator()
            break;
        case "+": case "-": case "*": case "/":
            if(display.innerText == "Error"){clearCalculator()}
            if(display.innerText == ""){
                userOperator = event.key
                auxDisplay.innerText = auxDisplay.innerText.slice(0,-1)
                addOnAuxDisplay(userOperator)
            }
            if(display.innerText != "" && userNum1 == "") {
                userOperator = event.key
                userNum1 = display.innerText
                clearAuxDisplay()
                auxDisplay.innerText = display.innerText + userOperator
                clearDisplay()
            }
            if(userNum1 != "" && display.innerText != "") {
                userNum2 = display.innerText
                auxDisplay.innerText = runOperation(userNum1, userNum2) 
                addOnAuxDisplay(userOperator)
                clearDisplay()
                userNum1 = runOperation(userNum1, userNum2)
                userNum2 = ""
                userOperator = event.key
            }
            break;
        case "Enter":
            if(display.innerText == "Error") {clearCalculator()}
            if(userNum1 != "" && display.innerText != "" ) {
                userNum2 = display.innerText 
                auxDisplay.innerText += userNum2 + "="
                clearDisplay()
                display.innerText = runOperation(userNum1, userNum2)
                userNum1 = ""
                userNum2 = ""
                }
            break;
    }
}

function clearCalculator(){
    clearAuxDisplay()
    display.innerText = 0
    userNum2 = ""
    userNum1 = ""
    userOperator = ""
    buttonDot.disabled = false
}

function runOperation(a,b){
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
            if(b == 0){result = "Error"; break;}
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

function dot(){
    tempDisplayInnerText = display.innerText
    if(tempDisplayInnerText.includes(".") == false && display.innerText != ""){
        addOnDisplay(".")
    }
}

function backspace(){
    display.innerText = display.innerText.slice(0,-1)
}

