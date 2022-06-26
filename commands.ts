import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10';
import { Command } from './types.js';
import { readdirSync } from 'fs';

export const commands: RESTPostAPIApplicationCommandsJSONBody[] = [], cmds: Command[] = [],
    commandFiles = readdirSync('./out/commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
    const command : Command = (await import(`./commands/${file}`)).default;
    commands.push(command.data.toJSON());
    cmds.push(command);
}