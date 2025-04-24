module.exports = {
  // Bot Settings
  botName: 'DILSHAN-MD', // Bot name (Display name)
  ownerNumber: '94712345678', // Your phone number (E.164 format)
  ownerName: 'Dilshan Ashinsa', // Your name

  // Command prefix
  prefix: '.', // Prefix to use before the commands (e.g., .menu)

  // Auth credentials folder path (where creds.json will be stored)
  authFolder: './auth_info_dilshanmd', // Default folder for auth information

  // Server and Network settings
  serverPort: 8080, // Port to run the server (change as needed)
  apiBaseUrl: 'https://api.whatsapp.com', // Base API URL for WhatsApp bot interactions
  sessionFilePath: './auth_info_dilshanmd/creds.json', // Path for saving session info (creds.json)

  // Command settings
  menuCommand: '.menu', // Command to show the menu
  statusCommand: '.status', // Command to check the status
  helloCommand: '.hello', // Command to greet the user
  songCommand: '.song', // Command for song request
};

