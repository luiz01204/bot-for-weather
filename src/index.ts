import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import * as qrcode from "qrcode-terminal"
import { handleMessage } from "./handlers/messageHandler"
import { log } from "./utils/logger"

async function startBot() {
    // Autenticação segura salva em vários arquivos
    const auth = await useMultiFileAuthState('auth')
    const versionInfo = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version: versionInfo.version,
        auth: auth.state,
        browser: ["BotZinho", 'Safari', '1.0.0']
    })

    // Conexão com whatsapp web:
    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
        // Se chegou um QR Code, mostra ele no terminal.
        if (qr) {
            qrcode.generate(qr, { small: true })
        }

        if (connection === 'close') {
            const code = (lastDisconnect?.error as any)?.output?.statusCode
            const foiDeslogado = code === DisconnectReason.loggedOut

            log.warn(`Conexão caiu! Código: ${code}`)

            // Tenta reconectar se não foi logout
            if (!foiDeslogado) {
                setTimeout(startBot, 5000)
            }
        }

        if (connection === 'open') {
            log.info('✅ Bot conectado com sucesso!')
        }
    })

    // Escuta novas mensagens e chama o handler
    sock.ev.on("messages.upsert", (msg) => handleMessage(sock, msg))

    // Salva as credenciais quando mudam
    sock.ev.on("creds.update", auth.saveCreds)
}

startBot()
