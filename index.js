import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {config} from "./config.js";
import {timeConverter} from "./functions.js"

//const for app
const app = express()
const port = 3000
//const for city part
var city = "Frankfurt am Main"
var cityURL = `q=${city}`
//const API Key
const APIKeyURL = `&appid=${config.APIKey}`
// const for language
const langURL = `&lang=de`
//const for Unit
const unitURL = "&units=metric"
// const for urL 
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?`
var URL = weatherURL+cityURL+langURL+APIKeyURL+unitURL
// usage of styles and bodyparser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// First Loading 
app.get("/", async (req,res) =>{
    try {
        const result = await axios.get(URL)
        console.log(result.data.city)
        console.log(URL)
        res.render("index.ejs", {data : result.data})
    } catch (error) {
        console.log(error)
        res.render("index.ejs", {data : error.data})
    }
})
// Get City data from API according to form input 
app.post("/", async (req,res) =>{
    //Check if City is entered
    if (req.body.city) {
        city = req.body.city
        cityURL = `q=${city}`
    }else {
        city = "Frankfurt am Main"
        cityURL = `q=${city}`
    }
    // Generate URL 
    URL = weatherURL+cityURL+langURL+APIKeyURL+unitURL
    console.log(URL)
    //Get data from API
    try {
        const result = await axios.get(URL)
        console.log(result.data.city)
        console.log(result.data.list[0])
        console.log(result.data.list[0].weather[0].icon)
        res.render("index.ejs", {
            //Transfer Data to correct name
            data : result.data, 
            sunrise : timeConverter(result.data.city.sunrise),
            sunset : timeConverter(result.data.city.sunset),
            time: JSON.stringify(result.data.list[0].dt_txt),
            temp: JSON.stringify(result.data.list[0].main.temp),
            weather: JSON.stringify(result.data.list[0].weather[0].description),
            icon: result.data.list[0].weather[0].icon
        })
    } catch (error) {
        console.log(error)
        res.render("index.ejs", {data : error.data})
    }
})
// Check if server is running
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})