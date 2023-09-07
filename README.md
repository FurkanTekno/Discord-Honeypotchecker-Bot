## Token Analyzer Discord Bot

The Token Analyzer Discord Bot is a bot built with Discord.js that provides information and analysis about cryptocurrency tokens. It allows users to analyze various token properties, such as scam status, anti-whale measures, honeypot detection, and more.

### Features
- Retrieve detailed analysis of a token based on its contract address
- Check if a token is flagged as a scam token
- Identify if a token has anti-whale measures in place
- Detect if a token is a honeypot
- Analyze token properties related to balance changes, external calls, self-destruction, and more

### Usage
To use the bot, simply add it to your Discord server and invoke the `/check` command followed by the token's contract address. The bot will fetch the analysis from the Aegis Web3 API and provide a detailed embed with the results.

### Technologies Used
- Node.js
- Discord.js
- Axios

### Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your Discord bot token 
4. Run the bot using `node index.js`

