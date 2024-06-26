import express, { json } from "express"

const app = express()
const PORT = 5550
app.use(express.json())

const getWeather = async (city) => {
    const apiKey = "99db9c79508a8f4717a84ead833267f7"
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    const objectURL = await fetch(url)
    const object = await objectURL.json()
    //    const data = JSON.stringify(object)
    return object.list
}

const getDate = (date) => {
    date = date.split("")
    date = date.slice(0, 10)
    date.push(" 21:00:00")
    date = date.join("")
    console.log(date);
    return date
}
app.post("/", async (req, res) => {
    const body = req.body.queryResult
    const data = JSON.stringify(body)
    console.log(data);
    
    if (body.intent.displayName === "Weather bot") {
        let list = await getWeather(body.parameters.geoCity)
        let newDate = getDate(body.parameters.date)
        let weather = list.find(object => object.dt_txt === newDate)
        console.log(weather);

        if (weather == undefined) {
            res.send(
                {
                    "fulfillmentMessages": [
                        {
                            "text": {       
                                "text": [
                                    "Sorry weather for this time is not avalible"
                                ]
                            }
                        }
                    ]
                }
            )
        }
        else {
            res.send(
                {
                    "fulfillmentMessages": [
                        {
                            "text": {
                                "text": [
                                    "The weather in " + body.parameters.geoCity + " on " + newDate + " is " + weather.main.temp + "°C"
                                ]
                            }
                        }
                    ]
                }
            )
        }

    }
})

app.listen(PORT, async () => {
    // let data = await getWeather("karachi")
    console.log(`server is running on localhost:${PORT}`)
})