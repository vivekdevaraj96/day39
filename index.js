var express=require("express")
var path=require("path")
var fs=require("fs")

var app=express()



app.use(express.static("filepath"))


app.get("/",(req,res)=>{
    const date=new Date()
    
    var fulldate=date.toISOString().slice(0,10)
    
    var time=date.toLocaleTimeString().replaceAll(':','-').replace(' ','-')
    

    var filename=fulldate+ '-(' +time+')'
   

  

    const dirpath=path.join(__dirname, "filepath", `${filename}.txt`)
   
    var content=`the date is ${filename}`

    fs.writeFileSync( dirpath, content, (err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file created")
        }
    })
    res.sendFile(dirpath)

})

app.get("/getfiles",(req,res)=>{

    fs.readdir(path.join(__dirname, "filepath"),(err,data)=>{
        if(err){ 
            console.log(err)
        }else{
            res.send(data)
        }
           
    
        
    })
    
})

app.listen(8000)