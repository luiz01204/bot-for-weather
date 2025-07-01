import { WASocket, proto } from "@whiskeysockets/baileys"
import { delay } from "../utils/delay"

export async function handleMenu(sock: WASocket, msg: proto.IWebMessageInfo) {
    await delay(2000, sock, msg.key.remoteJid!)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: "🤖 Bot de previsão do tempo: \n\n" +
            "📋 Comandos disponíveis:\n\n" +
            "- !info \n" +
            "- !hoje <cidade> \n" +
            "- !amanha <cidade> \n" +
            "- !depoisdeamanha <cidade>"
    })
}
