function calculate({ number1, number2, operation }) {
    if (operation === 'divide') {
        let result = number1 / number2;
        let intermediateStep = showDivisionSteps(number1, number2);
        return { answer: result, intermediateStep };
    }
}

function showDivisionSteps(dividend, divisor) {
    let stepString = '';
    let result = Math.floor(dividend / divisor);
    let remainder = dividend % divisor; 
    let steps = Math.floor(dividend / divisor);

    stepString += `Step 1: Divide ${dividend} by ${divisor} = ${steps} (Remainder: ${remainder})\n`;

    while (remainder > 0) {
        dividend = remainder * 10;
        steps = Math.floor(dividend / divisor);
        remainder = dividend % divisor;

        stepString += `Step ${stepString.split('\n').length}: Bring down 0, now divide ${dividend} by ${divisor} = ${steps} (Remainder: ${remainder})\n`;
    }

    return stepString.trim(); 
}

const input = { number1: 286, number2: 3, operation: "divide" };
console.log(input);
console.log(calculate(input));
