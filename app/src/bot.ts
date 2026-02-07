import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

declare module "discord.js" {
    interface Client {
        commands: Collection<any, any>;
    }
}

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.commands = new Collection();

bot.once(Events.ClientReady, async readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);

    // await bot.application?.commands.create({
    //     name: "hello",
    //     description: 'Répond avec "Bonjour!"',
    // });
});

bot.on(Events.InteractionCreate, interaction => {
    // if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

const commandsPath = path.join(import.meta.dirname, "commands");

fs.readdirSync(commandsPath)
    .filter(fileName => fileName.endsWith(".ts"))
    .map(fileName => path.join(commandsPath, fileName))
    .map(filePath => pathToFileURL(filePath).href)
    .map(async fileUrl => (await import(fileUrl)).default)
    .forEach(async command => {
        const c = await command;
        if ("data" in c && "execute" in c) {
            console.log(c);
            bot.commands.set(c.data.name, c);
        } else {
            console.log(`[WARNING] The command at ${c} is missing a required "data" or "execute" property.`);
        }
    });

bot.login(process.env.DISCORD_TOKEN);
