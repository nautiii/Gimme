import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { REST, Routes } from "discord.js";
import "dotenv/config";

const commandsPath = path.join(import.meta.dirname, "commands");
const commands = (
    await Promise.all(
        fs
            .readdirSync(commandsPath)
            .filter(fileName => fileName.endsWith(".ts"))
            .map(fileName => path.join(commandsPath, fileName))
            .map(filePath => pathToFileURL(filePath).href)
            .map(async fileUrl => (await import(fileUrl)).default),
    )
).map(command => command.data.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

async function deployCommands() {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        const data: any = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}

deployCommands();
