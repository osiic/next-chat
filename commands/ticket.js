const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Create tickets as you like")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const create = new ButtonBuilder()
      .setCustomId("create")
      .setLabel("Create Ticket")
      .setStyle(ButtonStyle.Success);
    const preview = new ButtonBuilder()
      .setCustomId("preview")
      .setLabel("Preview Ticket")
      .setStyle(ButtonStyle.Success);
    const done = new ButtonBuilder()
      .setCustomId("done")
      .setLabel("Save Ticket")
      .setStyle(ButtonStyle.Success);

    const select = new StringSelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Customize The Ticket")
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Custom Embed")
          .setDescription("Edit the embedding to customize it")
          .setValue("embed"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Ticket Option")
          .setDescription("Select want to use button or select menu")
          .setValue("option"),
      );

    const row = [
      new ActionRowBuilder().addComponents(select),
      new ActionRowBuilder().addComponents(preview, done, create),
    ];

    const response = await interaction.reply({
      components: [...row],
      ephemeral: true,
    });

    try {
      const confirmation = await response.awaitMessageComponent({
        time: 60000,
      });

      if (confirmation.customId === "preview") {
        await confirmation.update({
          content: `halo`,
        });
      } else if (confirmation.customId === "done") {
        await confirmation.update({
          content: "Action cancelled",
        });
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
