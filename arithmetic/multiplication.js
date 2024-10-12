function calculate({ number1, number2, operation }) {
 
    if (operation == 'multiply') {
      let result = number1 * number2;
      let intermediateStep = showMultiplicationSteps(number1, number2);
      return { answer: result, intermediateStep };
    }

  }

function showMultiplicationSteps(num1, num2) {
    let stepString = '';
    let result = [];
    const strNum1 = String(num1);
    const strNum2 = String(num2);
    
    for (let i = strNum2.length - 1; i >= 0; i--) {
      let carry = 0;
      let currentStep = '';
  
      
      for (let j = strNum1.length - 1; j >= 0; j--) {
        let product = parseInt(strNum2[i]) * parseInt(strNum1[j]) + carry;
        carry = Math.floor(product / 10);  
        currentStep = product + currentStep;  
   
        
      }

      if (carry > 0) {
        currentStep = carry + currentStep;
      }

      for (let k = 0; k < strNum2.length - 1 - i; k++) {
        currentStep += '0';

      }
  
      result.push(currentStep);
      stepString += `Step ${strNum2.length - i}: ${currentStep} `;
    }
  
    return stepString;
  }

  const input = { number1: 12, number2: 12, operation: "multiply" };
  console.log(input);
  console.log(calculate(input));