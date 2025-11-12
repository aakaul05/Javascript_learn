function performOperation()
{
    let num1=parseInt(document.getElementById('input1').value);
    let num2=parseInt(document.getElementById('input2').value);
if(!isNaN(num1) && !isNaN(num2))
{
    let result1=multiply(num1,num2);
    displayResult(result1);
    let result2=add(num1,num2);
    displayResult(result2);
    let result3=divide(num1,num2);
    displayResult(result3);
    let result4=subtract(num1,num2);
    displayResult(result4);
} else {
    displayResult('Please enter valid number');
}
}
function multiply(a,b){
    debugger;
    return a*b;
}
function add(a,b){
    debugger;
    return a+b;
}
function divide(a,b)
{
    debugger;
    return a/b;
}
function subtract(a,b){
    debugger;
    return a-b;
}
function displayResult(result){
    const resultElement = document.getElementById('result');
    resultElement.textContent+=`The result is: ${result}`
}
