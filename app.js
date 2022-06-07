const express= require("express")
const https = require("https")
const axios=require("axios");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended : true}))

app.post("/", (req, res)=>{

    let cityName=req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?appid=ae2d5b2f79af66902c854fe7ae385799&q=${cityName}&units=metric`

    https.get(url,(resp)=>{

        resp.on("data", (data)=>{ 

            const weatherData=JSON.parse(data);
            const city = weatherData.name;
            const temperature  = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const iconCode = weatherData.weather[0].icon
            const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`

            console.log("City : ",city);
            console.log("Temperature : ",temperature);
            console.log("Description : ",desc);
            console.log("iconURL : ",iconURL);

            res.write(`<h1 style="text-align:center"> The temperature in ${city} is ${temperature} degrees celsius. </h1>`)
            res.write(`<h1 style="text-align:center"> And, the weather condition is "${desc}". </h1>`)
            res.write(`<h1 style="text-align:center"><img src= ${iconURL}> </img><h1>`)
            res.send();

        })
    })

    //Using Axios
    // axios.get(url)
    // .then((resp)=>{
    //     console.log(resp.data);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
})


app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.listen(3000,()=>{
    console.log("Server started at 3000");
})
