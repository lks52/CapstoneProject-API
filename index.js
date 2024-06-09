import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {config} from "./config.js"

const app = express()

const port = 3000
const APIKeyURL = `&appid=${config.APIKey}`
const langURL = `&lang=de`
const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?`

var lat = 50.105840
var lon =8.687410
const latURL = `lat=${lat}`
const lonURL = `&lon=${lon}`

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req,res) =>{
    try {
        const result = await axios.get(weatherURL+latURL+lonURL+langURL+APIKeyURL)
        console.log(result.data)
        res.render("index.ejs", {data : JSON.stringify(result.data.city)})
    } catch (error) {
        console.log(error)
        res.render("index.ejs", {data : error.data})
    }
    
})










app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
})