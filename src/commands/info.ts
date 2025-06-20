import { WASocket, proto } from "@whiskeysockets/baileys"
import { delay } from "../utils/delay"

export async function handleInfo(sock: WASocket, msg: proto.IWebMessageInfo) {
    await delay(1000)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: "🤖 Sou um Assistente que responde a previsão do tempo. \nVeja minha documentação: https://github.com/luiz01204/bot-for-weather"
    })
}
