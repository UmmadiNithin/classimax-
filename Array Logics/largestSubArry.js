

// const array = [-2, 7, 5, -1, 3, 2, 9, -7];
// let currentSubarray = [];
// let largestSubarray = [];
// let largestSum = 0;
// let currentSum = 0;

// for (let i = 0; i < array.length; i++) {
//     if (array[i] > 0) {
//         currentSubarray.push(array[i]);
//         currentSum += array[i];
//     } 
//     else {
//         if (currentSum > largestSum) {
//             largestSum = currentSum;
//             largestSubarray = [...currentSubarray]; 
//         }
//         currentSubarray = [];
//         currentSum = 0;
//     }
// }

// if (currentSum > largestSum) {
//     largestSum = currentSum;
//     largestSubarray = [...currentSubarray];
// }

// console.log("Sum:", largestSum);
// console.log("Elements:", largestSubarray);





Array.prototype.largestPositiveSubarray = function() {
    let currentSubarray = [];
    let largestSubarray = [];
    let largestSum = 0;
    let currentSum = 0;

    for (let i = 0; i < this.length; i++) {  
        if (this[i] < 0) {
            currentSubarray.push(this[i]);
            currentSum += this[i];
        } else {
            if (currentSum < largestSum) {
                largestSum = currentSum;
                largestSubarray = currentSubarray; 
            }
            currentSubarray = [];
            currentSum = 0;
        }
    }

    if (currentSum < largestSum) {
        largestSum = currentSum;
        largestSubarray = currentSubarray;
    }

    return {
        sum: largestSum,
        elements: largestSubarray
    };
};


const array = [-1,-2,3,-4,-5,6];
const result = array.largestPositiveSubarray();

console.log("Sum:", result.sum);
console.log("Elements:", result.elements);
