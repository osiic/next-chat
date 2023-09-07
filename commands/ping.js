const { SlashCommandBuilder, ChannelType } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("input")
        .setRequired(true)
        .addChoices(
          { name: "satu", value: "satu" },
          { name: "dua", value: "dua" },
          { name: "tiga", value: "tiga" },
        ),
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to echo into")
        .addChannelTypes(ChannelType.GuildText),
    )
    .addBooleanOption((option) =>
      option.setName("ephemeral").setDescription("ephemeral"),
    ),

  async execute(interaction) {
    const input = interaction.options.getString("input");
    const ephemeralType = interaction.options.getBoolean("ephemeral");
    const channel = interaction.options.getChannel("channel", true);

    channel.send("hello!");
    await interaction.deferReply({ ephemeral: true });
    await wait(2000);
    await interaction.editReply("Ping");
    await interaction.followUp({ content: input, ephemeral: !!ephemeralType });
  },
};
