import { WASocket, proto } from "@whiskeysockets/baileys"
import { getForecast } from "../services/weatherService"
import { delay } from "../utils/delay"

export async function handleHoje(sock: WASocket, msg: proto.IWebMessageInfo, texto: string) {
    const partes = texto.trim().split(" ")
    if (partes.length < 2) {
        await sock.sendMessage(msg.key.remoteJid!, { text: "⚠️ Exemplo: !hoje Recife" })
        return
    }

    const cidadeOriginal = partes.slice(1).join(" ")
    const clima = await getForecast(cidadeOriginal, 0)

    if (!clima) {
        await delay(2000, sock, msg.key.remoteJid!)
        await sock.sendMessage(msg.key.remoteJid!, { text: "❌ Não consegui buscar a previsão do tempo." })
        return
    }

    await delay(2000, sock, msg.key.remoteJid!)

    await sock.sendMessage(msg.key.remoteJid!, {
        text: `🌤️ *Previsão para hoje em ${clima.cidade} - ${clima.pais}*\n📅 ${clima.data}\n🌡️ Mín: ${clima.min}°C | Máx: ${clima.max}°C\n📝 ${clima.condicao}`
    })
}
