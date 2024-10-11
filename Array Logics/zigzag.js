const str="nithin"
let row1=[],row2 =[]
let arr=[]

for(i=0;i<str.length;i++)
{
    if(i%2==0)row1.push(str[i])
        else row2.push(str[i])
}
arr.push(row1,row2)
console.log(row1,"\n",row2);


for(i=0;i<arr.length;i++)
{
    row =""
    for(j=0;j<arr[i].length;j++)
    {
        row+=arr[i][j]
    }
    console.log(row);
}

