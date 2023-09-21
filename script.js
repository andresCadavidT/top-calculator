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

// para usar en el proximo commit, surgio un Hotfix
// Crea la posibilidad de agegar dos eventos en el mismo addEventListener, la propiedad se llama addEventListener"s"2, notese la S! 
// agrego un 2 al final para evitar confusiones
// Node.prototype.addEventListeners2 = function(eventNames, eventFunction){
//     let eventNamesArray = eventNames.split(' ');
//     for (let i = 0; i < eventNamesArray.length; i++) {
//         this.addEventListener(eventNamesArray[i], eventFunction);
//     }
// }

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