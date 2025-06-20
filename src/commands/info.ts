import { WASocket, proto } from '@whiskeysockets/baileys'
import { delay } from '../utils/delay'

export async function handleInfo(sock: WASocket, msg: proto.IWebMessageInfo) {
    await delay(1000)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: '🤖 Sou um assistente pessoal que responde a previsão do tempo.'
    })
}
