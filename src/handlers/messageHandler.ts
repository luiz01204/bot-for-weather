import { proto, WASocket } from '@whiskeysockets/baileys'
import { handleMenu } from '../commands/menu'
import { handleInfo } from '../commands/info'
import { handleHoje } from '../commands/hoje'
import { handleAmanha } from '../commands/amanha'
import { handleDepois } from '../commands/depoisdeamanha'
import { log } from '../utils/logger'

// Responde apenas mensagens diretas (não de grupos) e de terceiros
export async function handleMessage(sock: WASocket, { messages }: any) {
    const msg: proto.IWebMessageInfo = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const jid = msg.key.remoteJid!
    if (!jid.endsWith('@s.whatsapp.net')) return // Evita responder grupos

    const texto =
        msg.message.conversation || msg.message.extendedTextMessage?.text || ''

    log.info(`Mensagem recebida de ${jid}: ${texto}`)

    // Responde comandos específicos
    if (texto === "menu" || texto === "Menu") return handleMenu(sock, msg)
    if (texto === "!info") return handleInfo(sock, msg)
    if (texto === "!hoje") return handleHoje(sock, msg, texto)
    if (texto === "!amanha") return handleAmanha(sock, msg, texto)
    if (texto === "!depoisdeamanha") return handleDepois(sock, msg, texto)

}
