import { WASocket, proto } from '@whiskeysockets/baileys'
import { delay } from '../utils/delay'

export async function handleMenu(sock: WASocket, msg: proto.IWebMessageInfo) {
    await delay(900)
    await sock.sendMessage(msg.key.remoteJid!, {
        text: '📋 Comandos disponíveis:\n\n- !info \n- !hoje \n- !amanha \n- !depoisdeamanha'
    })
}
