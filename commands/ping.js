const { SlashCommandBuilder, ChannelType } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    await wait(2000);
    await interaction.editReply("Pong");
  },
};
