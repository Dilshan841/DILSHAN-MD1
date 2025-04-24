```javascript
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_dilshanmd'); // Auth state එක save කරන folder එක
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // QR code print කිරීම නොකරන්න
        browser: ['DILSHAN-MD', 'Chrome', '1.0.0'],
    });

    // Creds update (save credentials)
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp Bot Successfully Connected!');
        }
    });

    // Pairing Code request කිරීම
    if (!sock.authState.creds.registered) {
