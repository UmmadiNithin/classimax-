function calculate({ number1, number2 , operation}) {
    if(operation=='add'){
    let result = number1 + number2;
    let intermediateStep = showAdditionSteps(number1, number2);
  
    return { answer: result, intermediateStep };
    }
    if(operation=='subtract')
    {
      let result = number1- number2;
      let intermediateStep = showSubtractionSteps(number1,number2)
      return {answer:result,intermediateStep}
    }
  }
  
  
  function showAdditionSteps(num1, num2) {
    let stepString = '';
    let carry = 0;
  
    const strNum1 = String(num1).split('').reverse();
    const strNum2 = String(num2).split('').reverse();
    const maxLength = Math.max(strNum1.length, strNum2.length);
  
    for (let i = 0; i < maxLength; i++) {
      let digit1 = i < strNum1.length ? parseInt(strNum1[i], 10) : 0;

      let digit2 = i < strNum2.length ? parseInt(strNum2[i], 10) : 0;
  
      let sum = digit1 + digit2 + carry;
      carry = Math.floor(sum / 10);
  
      stepString = `Adding digits: ${digit1} + ${digit2}  = ${sum % 10} (carry: ${carry}) \n`;
      
    }
  
    if (carry > 0) {
      stepString = ` Final carry: ${carry}  ${stepString} `;
    }
  
    return stepString || "No intermediate steps";
  }
  
  function showSubtractionSteps(num1, num2) {
    let stepString = '';
    let borrow = 0;
  
    const strNum1 = String(num1).split('').reverse();
    const strNum2 = String(num2).split('').reverse();
  
  
    const maxLength = Math.max(strNum1.length, strNum2.length);
  
    for (let i = 0; i < maxLength; i++) {
      let digit1 = i < strNum1.length ? parseInt(strNum1[i], 10) : 0;
      let digit2 = i < strNum2.length ? parseInt(strNum2[i], 10) : 0;
      
  
      digit1 = digit1 - borrow;
  
      if (digit1 < digit2) {
        digit1 = digit1 + 10 ;
        borrow = 1;    
      } else {
        borrow = 0;    
      }
  
      let diff = digit1 - digit2; 
         
      stepString += `Subtracting digits: ${digit1} - ${digit2} = ${diff} (borrow: ${borrow}) \n`;
    }
  
    return stepString || "No intermediate steps";
  }
  
  
  
  
  const input = { number1: 99, number2: 87 ,operation:"add" };
  console.log(calculate(input));
  
  const input2 ={ number1: 196, number2: 87 ,operation:"subtract" };
  console.log(calculate(input2));