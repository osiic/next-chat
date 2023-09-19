const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create tickets as you like")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    let channel;
    await interaction
      .deferReply
      // { ephemeral: true }
      ();

    try {
      channel = await interaction.guild.channels.create({
        name: `t-${interaction.user.username}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.guild.roles.everyone.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
        ],
      });
      channel.send(
        `halo <@${interaction.user.id}> pindah ke <#1003673516861816973>`,
      );

      await interaction.editReply(
        `Ticket is ready to use, move on <#${channel.id}>`,
      );
      await wait(1000 * 60);
      channel.delete();
    } catch (err) {
      await interaction.editReply(
        `Tickets cannot be created \`\`\`\n${err}\`\`\``,
      );
    }
  },
};
