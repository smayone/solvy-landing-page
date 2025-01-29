# SOLVY Chain Chrome Extension

This folder contains the necessary files for deploying the SOLVY blockchain visualization as a Chrome extension through Freename.io for solvy.chain.

## File Structure
```
chrome-extension/
├── manifest.json       # Extension configuration
├── index.html         # Main visualization page
├── icons/             # Extension icons
└── README.md          # This file
```

## Deployment Steps for solvy.chain

1. Copy these files to your local machine
2. Log in to Freename.io
3. Navigate to your solvy.chain domain management
4. Upload the entire folder structure
5. Configure the DNS settings to point to the uploaded content
6. For the Chrome extension:
   - Open Chrome
   - Go to chrome://extensions/
   - Enable Developer Mode
   - Click "Load unpacked"
   - Select this folder

The visualization should now be accessible through your solvy.chain domain and as a Chrome extension.

## Notes
- Make sure all paths in the HTML file are relative
- The D3.js library is loaded from CDN for better performance
- Icons should be replaced with your actual SOLVY logo images
