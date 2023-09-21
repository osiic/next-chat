const {
  Collection,
  ChannelType,
  PermissionFlagsBits,
  Events,
} = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      // respond to the Chat

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      const { cooldowns } = interaction.client;

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.data.name);
      const defaultCooldownDuration = 3;
      const cooldownAmount =
        (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime =
          timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({
            content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
            ephemeral: true,
          });
        }
      }

      try {
        await command.execute(interaction);
        timestamps.set(interaction.user.id, now);
        setTimeout(
          () => timestamps.delete(interaction.user.id),
          cooldownAmount,
        );
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else if (interaction.isButton()) {
      // respond to the button
      try {
        let channel;
        await interaction.deferReply({ ephemeral: true });
        switch (interaction.customId) {
          case "open-ticket":
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

              channel.send({
                content: `<@${interaction.user.id}>`,
                // embeds: [ticketEmbed],
                // components: [new ActionRowBuilder().addComponents(openTicket)],
              });

              await interaction.editReply(
                `Ticket is been created, move on <#${channel.id}>`,
              );
            } catch (error) {
              console.error(error);
            }
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(`Error executing ${interaction.customId}`);
        console.error(error);
      }
    } else if (interaction.isStringSelectMenu()) {
      // respond to the select menu
    }
  },
};
