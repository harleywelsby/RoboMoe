// =============================================================
// || Discord Bot TypeScript Template                         ||
// =============================================================
// || AUTHOR: Harley Welsby, https://github.com/harleywelsby  ||
// =============================================================

import { Client, Events, IntentsBitField } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config/config.json' assert { type: 'json' };
import { 
    CommandRegisterLocation, 
    ErrorFailedToCreateBot, 
    LoggedInMessage, 
    RefreshingSlashCommandsMessage 
} from './constants/const';

export const bot: Client = new Client({ intents: [
    IntentsBitField.Flags.Guilds, 
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers
    ], 
});
const commands: string[] = [];

// Load commands into Discord.js from ./commands
import(CommandRegisterLocation).then((slashCommandBuilders) => {
    Object.keys(slashCommandBuilders).forEach((key) => {
        commands.push(slashCommandBuilders[key].toJSON());
    });

    // Refresh slash commands on startup
    const rest = new REST({ version: '10' }).setToken(config.Token);
    (async () => {
        try {
            console.log(RefreshingSlashCommandsMessage);
            
            await rest.put(
                Routes.applicationCommands(config.ClientId),
                { body: commands }
            );
        }
        catch (error) {
            console.error(error);
        }
    })();

    // Login
    bot.on(Events.ClientReady, () => {
        console.log(LoggedInMessage);

        if (!bot.user) {
            console.error(ErrorFailedToCreateBot);
        }

        // Custom activity - displays in the members side bar in the server
        bot.user.setActivity(config.ActivityMessage, { type: parseInt(config.ActivityTypeEnum) });
    });

    bot.login(config.Token);
});