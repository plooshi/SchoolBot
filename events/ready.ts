import { Event } from '../types.js';
import { Routes } from 'discord-api-types/v10';
import { REST } from '@discordjs/rest';
import { commands } from '../commands.js';
import { guild, token, updateSpam, spam } from '../data.js';
import { Guild, MessageEmbed } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(token);

export default {
    name: "ready",
    execute: async (client) => {
        updateSpam(client.guilds.cache.find(g => g.id == guild) as Guild | null);
        client.user?.setActivity("a lot of things...", { type: "WATCHING" });

        await rest.put(
            Routes.applicationGuildCommands(client.user?.id ? client.user?.id : "", guild),
            { body: commands },
        );
        console.log("Booted!");
        const embed = new MessageEmbed()
        embed.setTitle("Bot has started!")
        embed.setDescription("Back to waiting...")
        embed.setColor("#00ff00")
        embed.setTimestamp()
        spam.send({ embeds: [ embed ] });
    }
} as Event<"ready">;