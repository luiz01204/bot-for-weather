import { WASocket, proto } from '@whiskeysockets/baileys'
import { getForecast } from '../services/weatherService'
import { delay } from '../utils/delay'

export async function handleDepois(sock: WASocket, msg: proto.IWebMessageInfo, texto: string) {
    const partes = texto.split(' ')
    if (partes.length < 2) {
        await sock.sendMessage(msg.key.remoteJid!, { text: '⚠️ Ex: !depoisdeamanha Recife' })
        return
    }

    const cidade = partes.slice(1).join(' ')
    const clima = await getForecast(cidade, 2)

    if (!clima) {
        await sock.sendMessage(msg.key.remoteJid!, { text: '❌ Não consegui buscar a previsão.' })
        return
    }

    await delay(1200)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: `🌤️ Previsão para *depois de amanhã* em *${clima.cidade} - ${clima.pais}*:\n📅 ${clima.data}\n🌡️ ${clima.min}°C ~ ${clima.max}°C\n📝 ${clima.condicao}`
    })
}
