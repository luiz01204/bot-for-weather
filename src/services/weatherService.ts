import axios from "axios"

const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = "http://api.weatherapi.com/v1"

// Clima atual (hoje)
export async function getCurrentWeather(city: string) {
    try {
        const { data } = await axios.get(`${BASE_URL}/current.json`, {
            params: { key: API_KEY, q: city, lang: "pt" }
        })

        return {
            cidade: data.location.name,
            pais: data.location.country,
            temp: data.current.temp_c,
            condicao: data.current.condition.text,
            icone: data.current.condition.icon
        }
    } catch (err) {
        return null
    }
}

// Previsão para N dias (0 = hoje, 1 = amanhã, 2 = depois)
export async function getForecast(city: string, day: number) {
    try {
        const { data } = await axios.get(`${BASE_URL}/forecast.json`, {
            params: { key: API_KEY, q: city, days: day + 1, lang: "pt" }
        })

        const dia = data.forecast.forecastday[day]
        return {
            cidade: data.location.name,
            pais: data.location.country,
            data: dia.date,
            max: dia.day.maxtemp_c,
            min: dia.day.mintemp_c,
            condicao: dia.day.condition.text
        }
    } catch (err) {
        return null
    }
}
