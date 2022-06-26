import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, CacheType, ClientEvents, Awaitable } from 'discord.js';

export type Command = { 
    data: SlashCommandBuilder, 
    execute: (client : Client<boolean>, interaction : CommandInteraction<CacheType>) => Awaitable<void>,
};


export type Event<E extends keyof ClientEvents> = {
    name?: E,
    execute: (client : Client<boolean>, ...args : ClientEvents[E]) => Awaitable<void>
}