import axios from "axios"
import { normalizeText } from "../utils/normalizeText"
import * as dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.HG_API_KEY

if (!API_KEY) {
    throw new Error("❌ Variável HG_API_KEY não encontrada no .env")
}

interface Forecast {
    cidade: string
    pais: string
    data: string
    min: number
    max: number
    condicao: string
}

export async function getForecast(cidade: string, dia: number): Promise<Forecast | null> {
    try {
        const response = await axios.get("https://api.hgbrasil.com/weather", {
            params: {
                key: API_KEY,
                city_name: normalizeText(cidade),
                format: "json"
            }
        })

        const data = response.data.results

        if (!data || !data.forecast || !data.forecast[dia]) return null

        const diaForecast = data.forecast[dia]

        return {
            cidade: data.city,
            pais: "Brasil",
            data: diaForecast.date,
            min: diaForecast.min,
            max: diaForecast.max,
            condicao: diaForecast.description
        }
    } catch (error) {
        console.error("Erro ao buscar previsão:", error)
        return null
    }
}
