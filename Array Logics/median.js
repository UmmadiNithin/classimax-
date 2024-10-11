let array1=[1,9,3,2]
let array2=[2,2,7,4]
let finalarray=[...array1,...array2]
console.log("concatinated array is :",finalarray)
let len=finalarray.length
let array = finalarray
for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    if (array[j] > array[j + 1]) {
      let temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
    }
  }
}

console.log("the sorted array is :",array)
console.log("the length is :"+len)
if(len % 2 == 0){
let n1=len/2
let finaln1=n1-1
let a=array[finaln1]
let n2=(len/2)+1
let finaln2=n2-1
let b=array[finaln2]
let output=(a+b)/2
 console.log("the median is :"+output)
}
else{
let median=(len+1)/2
let finalmedian=median - 1
 console.log("the median is :" + finalarray[finalmedian])

}