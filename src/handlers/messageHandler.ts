import { proto, WASocket } from "@whiskeysockets/baileys"
import { handleMenu } from "../commands/menu"
import { handleInfo } from "../commands/info"
import { handleHoje } from "../commands/hoje"
import { handleAmanha } from "../commands/amanha"
import { handleDepois } from "../commands/depoisdeamanha"
import { log } from "../utils/logger"

// Responde apenas mensagens diretas (não de grupos) e de terceiros
export async function handleMessage(sock: WASocket, { messages }: any) {
    const msg: proto.IWebMessageInfo = messages[0]

    if (!msg.message || msg.key.fromMe){
        return
    } 

    const jid = msg.key.remoteJid!

    // Ignora grupos
    if (!jid.endsWith("@s.whatsapp.net")) {
        return
    }

    const texto = msg.message.conversation || msg.message.extendedTextMessage?.text || ""

    log.info(`Mensagem recebida de ${jid}: ${texto}`)

    // Responde comandos específicos
    const comando = texto.trim().toLowerCase()

    if (comando === "menu") return handleMenu(sock, msg)
    if (comando === "!info") return handleInfo(sock, msg)
    if (comando.startsWith("!hoje")) return handleHoje(sock, msg, texto)
    if (comando.startsWith("!amanha")) return handleAmanha(sock, msg, texto)
    if (comando.startsWith("!depoisdeamanha")) return handleDepois(sock, msg, texto)
}
