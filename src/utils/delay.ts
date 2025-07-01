import { WASocket } from "@whiskeysockets/baileys";

// Espera um tempo (em ms) e simula "digitando..." no WhatsApp
export const delay = async (ms: number, socket: WASocket, jid?: string) => {
    if (jid) {
        // Simula digitando
        await socket.sendPresenceUpdate('composing', jid)
    }

    await new Promise(resolve => setTimeout(resolve, ms))

    if (jid) {
        // Para de digitar
        await socket.sendPresenceUpdate('paused', jid)
    }
}
