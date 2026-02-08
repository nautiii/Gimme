import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Client, Collection, EmbedBuilder, Events, GatewayIntentBits, MessagePayload } from "discord.js";
import "dotenv/config";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>;
    }
}

const bot = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

bot.commands = new Collection();

bot.once(Events.ClientReady, async client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

bot.on(Events.InteractionCreate, interaction => {
    if (interaction.isChatInputCommand()) {
        try {
            const command = interaction.client.commands.get(interaction.commandName);
            command?.execute(interaction);
        } catch (error) {
            interaction.reply({ content: `Failed to execute command : ${error}`, ephemeral: true });
        }
    }
});

bot.on(Events.MessageCreate, message => {
    console.log(message.content);
});

const commandsPath = path.join(import.meta.dirname, "commands");
const commands = await Promise.all(
    fs
        .readdirSync(commandsPath)
        .filter(fileName => fileName.endsWith(".ts"))
        .map(fileName => path.join(commandsPath, fileName))
        .map(filePath => pathToFileURL(filePath).href)
        .map(async fileUrl => (await import(fileUrl)).default),
);

commands.forEach(command => bot.commands.set(command.data.name, command));

bot.login(process.env.DISCORD_TOKEN).catch(reason => console.error(reason));
