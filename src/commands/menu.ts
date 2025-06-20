import { WASocket, proto } from "@whiskeysockets/baileys"
import { delay } from "../utils/delay"

export async function handleMenu(sock: WASocket, msg: proto.IWebMessageInfo) {
    await delay(1000)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: "📋 Comandos disponíveis:\n\n- !info \n- !hoje <cidade> \n- !amanha <cidade> \n- !depoisdeamanha <cidade>"
    })
}
