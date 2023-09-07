const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    await interaction.reply(`besok bang, tapi yang gimana`);
  },
};
