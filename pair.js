import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys';
import fs from 'fs';

// Configurations
const config = {
  botName: 'DILSHAN-MD',
  ownerNumber: '94772194789', // ඔබේ WhatsApp අංකය (+94 නැතුව)
  authFolder: './auth_info_dilshanmd',
};

async function pairBot() {
  const { state, saveCreds } = await useMultiFileAuthState(config.authFolder);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    browser: [config.botName, 'Chrome', '1.0.0'],
  });

  // Save credentials automatically
  sock.ev.on('creds.update', saveCreds);

  // Generate Pairing Code if not already registered
  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(config.ownerNumber);
    console.log(`\n📲 Pairing Code: code`);
    console.log('➡️ Go to WhatsApp > Linked Devices > Pair via Code > Enter this code');
   else 
    console.log('✅ Already paired with WhatsApp.');
  

  sock.ev.on('connection.update', (update) => 
    const  connection  = update;
    if (connection === 'open') 
      console.log(`✅{config.botName} connected to WhatsApp successfully!`);
    }
  });
}

pairBot();
