let express = require("express")
let bodyParser = require("body-parser")
let https = require("https")

let app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {

    let place = req.body.place

    let url  = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=163a06221608b6d43aef4bc8eb6cd6cd&units=metric`

    https.get(url, (response) => {

        // http://openweathermap.org/img/wn/10d@2x.png
        response.on("data", (data) => {

            let weatherData = JSON.parse(data)
            let icon = weatherData.weather[0].icon
            let iconUrl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.write(`<h1>Weather : ${weatherData.weather[0].description}</h1>`)
            res.write(`<h1>Temperature : ${weatherData.main.temp}</h1>`)
            res.write("<img src="+ iconUrl +">")
            res.send()
        })
    })
})


app.listen(5000, () => {

    console.log("Server is running on port 5000...");
})