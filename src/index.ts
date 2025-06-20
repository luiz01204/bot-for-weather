import makeWASocket, {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from "@whiskeysockets/baileys"
import * as qrcode from "qrcode-terminal"
import { handleMessage } from "./handlers/messageHandler"
import { log } from "./utils/logger"

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        browser: ['BotZinho', 'Safari', '1.0.0'] 
    })

    // Mostra o QR code
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) qrcode.generate(qr, { small: true })

        if (connection === 'close') {
            const code = (lastDisconnect?.error as any)?.output?.statusCode
            log.warn(`Conexão encerrada (código: ${code})`)
            const shouldReconnect = code !== DisconnectReason.loggedOut
            if (shouldReconnect) {
                setTimeout(() => startBot(), 5000) // Delay pra reconectar sem spam
            }
        }

        if (connection === 'open') {
            log.info('Bot conectado ao WhatsApp! ✅')
        }
    })

    // Ouve novas mensagens
    sock.ev.on('messages.upsert', async (msg) => handleMessage(sock, msg))

    sock.ev.on('creds.update', saveCreds)
}

startBot()
