const a = [12,17,15,109,-4]
for(i=0;i<a.length;i++)
    {
      for(j=0;j<a.length;j++)
      {
        if(a[i]<a[j])
        {
          [a[i], a[j]]=[a[j],a[i]]
          console.log("after swapping",a)
        }
      }
    }
    console.log("sorted Array",a)