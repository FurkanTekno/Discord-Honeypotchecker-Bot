const { Client, CommandInteraction, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { spawn } = require('child_process');



const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    // Add other necessary intents here
  ],
});

bot.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.data.name, command);
}

const guildId = ''; // Replace with your server ID

bot.once('ready', async () => {
  try {
    await bot.guilds.cache.get(guildId)?.commands.fetch();
    console.log('Slash commands fetched successfully.');

    await bot.guilds.cache.get(guildId)?.commands.set(bot.commands.map((command) => command.data));
    console.log('Slash commands deployed successfully.');
  } catch (error) {
    console.error('Error occurred while deploying slash commands:', error);
  }
});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  const command = bot.commands.get(commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Error occurred while executing the command:', error);
    interaction.reply('An error occurred while executing the command. Please try again later.');
  }
});


bot.login('');
