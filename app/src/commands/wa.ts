import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const command = {
    data: new SlashCommandBuilder().setName("roll").setDescription("mudae"),
    execute: async (interaction: CommandInteraction) => {
        await interaction.reply("$wa");
    },
};

export default command;
