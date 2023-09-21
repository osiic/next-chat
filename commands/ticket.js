const {
  ChannelType,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create tickets as you like")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    try {
      let channel;
      const ticketEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Ticket Menu")
        .setDescription(
          "**Open a new Ticket using the button below this message!**",
        )
        .setImage(
          "https://images-ext-2.discordapp.net/external/BXAWHfVpCjFQ9MD9wnUytVoZqZ0B0KUD6XZM0liR-Y0/https/i.imgur.com/AZlgvgi.png",
        )
        .setFooter({
          text: "Do not use for joking or playing around",
          iconURL: interaction.guild.iconURL(),
        });

      const openTicket = new ButtonBuilder()
        .setLabel("Open a Ticket")
        .setCustomId("open-ticket")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🎫");

      channel = await interaction.guild.channels.create({
        name: `ticket`,
        type: ChannelType.GuildText,
      });

      channel.send({
        embeds: [ticketEmbed],
        components: [new ActionRowBuilder().addComponents(openTicket)],
      });
      await interaction.editReply(`Ticket is ready, move on <#${channel.id}>`);
    } catch (err) {
      await interaction.editReply(
        `Tickets cannot be created \`\`\`\n${err}\`\`\``,
      );
    }
  },
};
