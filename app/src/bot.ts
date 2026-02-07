import { Client, Events, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once(Events.ClientReady, (readyClient: Client<true>) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

bot.login(process.env.DISCORD_TOKEN);
