

let num=123
let sample=num
let revnum=sample.toString().split('').reverse().join('')
let convert=parseInt(revnum)
console.log(convert)
console.log(revnum)

if(convert == num){
console.log("true")
}
else{
console.log("false")
} 
