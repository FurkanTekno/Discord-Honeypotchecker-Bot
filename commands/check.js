const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('check')
    .setDescription('Analyzes a token.')
    .addStringOption((option) =>
      option.setName('tokenaddress')
        .setDescription('The address of the token.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const tokenAddress = interaction.options.getString('tokenaddress');

    try {
      const response = await axios.get(`https://approve.aegisweb3.com/api/User/TokenSecurity?address=${tokenAddress}&chainid=1`);
      const { errorCode, errorMsg, result } = response.data;
      const { token_name, token_symbol, is_scamtoken, is_anti_whale, is_honeypot, can_change_balance,
        can_external_call,
        can_selfdestruct,
        can_set_cooldown,
        can_set_fee,
        can_set_paused,
        can_take_ownership,
        created_at,
        owner,
        contract_address } = result;

      const dexscreenerLink = `https://dexscreener.com/ethereum/${contract_address}`;
      const uniswapLink = `https://app.uniswap.org/#/swap?outputCurrency=${tokenAddress}`;
      const dextoolsLink = `https://www.dextools.io/app/en/ether/pair-explorer/${tokenAddress}`;

      const formatFieldValue = (value) => {
        if (value === 'unknown') {
          return '⚠️ Unknown';
        }
        return value ? '❌' : '✅';
      };

      const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Analysis for token: ${token_name} ($${token_symbol})`)
        .setDescription(`Contract Address: \`\`\`${contract_address}\`\`\``)
        .setFooter({ text: 'DYOR! Not always accurate' })
        .addFields(
          { name: 'Scam Token', value: formatFieldValue(is_scamtoken), inline: true },
          { name: 'Anti-whale Token', value: formatFieldValue(is_anti_whale), inline: true },
          { name: 'Honeypot Token', value: formatFieldValue(is_honeypot), inline: true },
          { name: 'Can Change Balance', value: formatFieldValue(can_change_balance), inline: true },
          { name: 'Can Make External Calls', value: formatFieldValue(can_external_call), inline: true },
          { name: 'Can Self-Destruct', value: formatFieldValue(can_selfdestruct), inline: true },
          { name: 'Can Set Cooldown', value: formatFieldValue(can_set_cooldown), inline: true },
          { name: 'Can Set Fee', value: formatFieldValue(can_set_fee), inline: true },
          { name: 'Can Set Paused', value: formatFieldValue(can_set_paused), inline: true },
          { name: 'Can Take Ownership', value: formatFieldValue(can_take_ownership), inline: true },
          { name: 'Links', value: `[DexScreener](${dexscreenerLink})       [Uniswap](${uniswapLink})       [Dextools](${dextoolsLink})` }
        );

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error occurred while analyzing the token:', error);
      interaction.reply('An error occurred while analyzing the token. Please try again later.');
    }
  },
};

