// const arr1=[1,3,4,7,6]
// const arr2=[3,4,6,9]
// for(let i=0;i<arr1.length;i++){
//     for(let j=0;j<arr2.length;j++){
//         if(arr1[i]==arr2[j]){
//             console.log(arr1[i],arr2[j])

//         }
//     }
// }


const arr1=[1,3,4,7,6]
const arr2=[3,4,6,9]
var len1=arr1.length
var len2=arr2.length
var output=[]
if(len1>=len2){
    var finallength=len1
   
}else{
    var finallength=len2
}

for(let i=0;i<finallength.length;i++){
       if (arr2.includes(arr1[i])){

            output.push(arr1[i])

        }
    }
    console.log(output)


// const arr1 = [1, 3, 4, 7, 6];
// const arr2 = [3, 4, 6, 9,9,0,7];
// var len1 = arr1.length;
// var len2 = arr2.length;
// var output = [];
// var finallength = len1 >= len2 ? len1 : len2;

// for (let i = 0; i < len1; i++) {
//     if (arr2.includes(arr1[i])) {
//         output.push(arr1[i]);
//     }
// }

// console.log(output);

