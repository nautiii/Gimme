import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const command = {
    data: new SlashCommandBuilder().setName("roll").setDescription("mudae"),
    execute: async (interaction: CommandInteraction) => {
        if (interaction.channel?.isSendable()) {
            await interaction.channel.send("$wa");
            interaction.reply("aled je me fait cancel");
        }
    },
};

export default command;
