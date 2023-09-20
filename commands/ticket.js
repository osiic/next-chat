const {
  ChannelType,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create tickets as you like")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    console.log(interaction);
    let channel;
    await interaction
      .deferReply
      // { ephemeral: true }
      ();

    try {
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
        permissionOverwrites: [
          //   {
          //     id: interaction.user.id,
          //     allow: [PermissionFlagsBits.ViewChannel],
          //   },
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });

      channel.send({
        embeds: [ticketEmbed],
        components: [new ActionRowBuilder().addComponents(openTicket)],
      });
      await interaction.editReply(`Ticket is ready, move on <#${channel.id}>`);
      await wait(1000 * 6);
      channel.delete();
    } catch (err) {
      await interaction.editReply(
        `Tickets cannot be created \`\`\`\n${err}\`\`\``,
      );
    }
  },
};
