import { SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { Command } from '../types.js';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { CommandInteractionOptionResolver } from 'discord.js';

let builder = new SlashCommandBuilder();

builder.setName('savenote');
builder.setDescription('Save a note');
builder.addStringOption(
    new SlashCommandStringOption()
        .setName('note')
        .setDescription("The note to save")
        .setRequired(true)
);

export default {
    data: builder,
    async execute(client, interaction) {
        if (!existsSync(`./data/notes/${interaction.user.id}`)) {
            mkdirSync(`./data/notes/${interaction.user.id}`);
        }
        let id : number;
        try {
            id = parseInt(readFileSync(`./data/notes/${interaction.user.id}/_next`).toString());
        } catch {
            id = 0;
        }
        writeFileSync(`./data/notes/${interaction.user.id}/${id}.txt`, (interaction.options as CommandInteractionOptionResolver).getString('note') as string);
        writeFileSync(`./data/notes/${interaction.user.id}/_next`, (id + 1).toString());
        await interaction.reply({
            content: `Saved note with id ${id}!`,
            ephemeral: true
        });
    }
} as Command;