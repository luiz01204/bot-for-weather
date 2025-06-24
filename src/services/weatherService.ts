import axios from "axios"
import * as dotenv from "dotenv"

dotenv.config()

const API_KEY = process.env.HG_API_KEY

// Se não tiver a chave, para tudo e mostra erro
if (!API_KEY) {
    throw new Error("❌ A variável HG_API_KEY não foi encontrada no arquivo .env")
}

// Interface com o formato da previsão do tempo
interface Forecast {
    cidade: string
    pais: string
    data: string
    min: number
    max: number
    condicao: string
}

// Verifica se o usuário provavelmente quis dizer "São Paulo"
function usuarioRealmenteQuisSaoPaulo(nomeDigitado: string): boolean {
    const textoSemAcento = nomeDigitado
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()

    return textoSemAcento.includes("sao paulo")
}

// Função principal que busca a previsão
export async function getForecast(nomeDaCidade: string, dia: number): Promise<Forecast | null> {
    try {
        // Faz a requisição para a API da HG Brasil
        const resposta = await axios.get("https://api.hgbrasil.com/weather", {
            params: {
                key: API_KEY,
                city_name: nomeDaCidade, // Ex: "Balneário Camboriú"
                format: "json"
            }
        })

        const dados = resposta.data.results

        // ⚠️ Se a API retornar São Paulo mas o usuário NÃO escreveu São Paulo, dá erro
        if (dados.city.toLowerCase() === "são paulo" && !usuarioRealmenteQuisSaoPaulo(nomeDaCidade)) {
            return null
        }

        // Garante que o dia solicitado existe na resposta
        const previsaoDoDia = dados.forecast?.[dia]
        if (!previsaoDoDia) return null

        // Retorna os dados organizados no formato Forecast
        return {
            cidade: dados.city,
            pais: "Brasil",
            data: previsaoDoDia.date,
            min: previsaoDoDia.min,
            max: previsaoDoDia.max,
            condicao: previsaoDoDia.description
        }
    } catch (erro) {
        console.error("Erro ao buscar previsão do tempo:", erro)
        return null
    }
}
