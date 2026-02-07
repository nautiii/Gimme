import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const command = {
    data: new SlashCommandBuilder().setName("wa").setDescription("Test mudae"),
    async execute(interaction: CommandInteraction) {
        await interaction.reply("$wa");
    },
};

export default command;
