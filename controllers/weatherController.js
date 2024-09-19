const axios = require('axios')
const redisClient = require('../utils/redisClient')

const getWeather = async (req, res) => {
    const city = req.params.city;
    const cacheKey = `weather:${city}`

    try{
        const cachedData = await redisClient.get(cacheKey)
        if(cachedData){
            console.log("Fetched from redis cache")
            return res.json(JSON.parse(cachedData))
        } else{
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=${process.env.API_KEY}`)
            
            if(!response.data){
                return res.status(404).json({message: "Weather data not found for this city"})
            }
            const weatherData = response.data

            await redisClient.set(cacheKey, JSON.stringify(weatherData), 'EX', 43200)
            res.json(weatherData)
        }
    } catch(ex){
        if(ex.response && ex.message.status == 404){
            return res.status(404).json({message: "Weather data not found for this city"})
        }
        console.log("Error fetching weather data", ex)
        res.status(500).json({message: "Failed to fetch weather data"})
    }
}

module.exports = {getWeather}