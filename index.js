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
    const phoneNumber = '94772194789'; // ඔබගේ WhatsApp අංකය (E.164 format)
        const code = await sock.requestPairingCode(phoneNumber); // Pairing Code request
        console.log('📱 Pairing Code: ' + code); // Terminal එකේ Pairing Code print වෙයි
    }

    // Command Handling
    sock.ev.on('messages.upsert', async (msg) => {
        const m = msg.messages[0];
        if (!m.message) return;
        const from = m.key.remoteJid;
        const text = m.message?.conversation || '';

        // Menu Command
        if (text === '.menu') {
            await sock.sendMessage(from, { text: '📋 Bot Commands:\n1) .status\n2) .hello\n3) .song' });
        } else if (text === '.hello') {
            await sock.sendMessage(from, { text: '👋 Hello! I am DILSHAN-MD Bot.' });
        } else if (text === '.song') {
            await sock.sendMessage(from, { text: '🎶 Your song request will be processed soon!' });
        }
    });
}

startBot();
``` 
