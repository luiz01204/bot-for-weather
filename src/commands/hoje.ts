import { WASocket, proto } from "@whiskeysockets/baileys"
import { getCurrentWeather } from "../services/weatherService"
import { delay } from "../utils/delay"

export async function handleHoje(sock: WASocket, msg: proto.IWebMessageInfo, texto: string) {
  const partes = texto.split(' ')
  if (partes.length < 2) {
    await sock.sendMessage(msg.key.remoteJid!, { text: "⚠️ Ex: !hoje Recife" })
    return
  }

  const cidade = partes.slice(1).join(" ")
  const clima = await getCurrentWeather(cidade)

  if (!clima) {
    await sock.sendMessage(msg.key.remoteJid!, { text: "❌ Não consegui buscar o clima." })
    return
  }

  await delay(1200)
  await sock.sendMessage(msg.key.remoteJid!, {
    text: `🌤️ Clima atual em *${clima.cidade} - ${clima.pais}*:\n🌡️ ${clima.temp}°C\n📝 ${clima.condicao}`
  })
}
