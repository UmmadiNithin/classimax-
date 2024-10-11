

let input = "babab"
let output=[]

for(let i = 0; i < input.length; i++) {
    for(let j = i + 1; j <= input.length; j++) {
        let original=input.substring(i, j);
         let b=original
         let reverse=b.reverse()
         if(original== reverse){
            output.push(original)
         }
        // console.log(input.substring(i, j));

    }
}
console.log(output)