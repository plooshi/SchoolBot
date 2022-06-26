import { SlashCommandBuilder, SlashCommandNumberOption } from '@discordjs/builders';
import { Command } from '../types.js';
import { existsSync, readFileSync } from 'fs';

let builder = new SlashCommandBuilder();

builder.setName('getnote');
builder.setDescription('Get a note');
builder.addNumberOption(
    new SlashCommandNumberOption()
        .setName('id')
        .setDescription("The note ID")
        .setRequired(true)
);

export default {
    data: builder,
    async execute(client, interaction) {
        let id = interaction.options.getNumber("id") as number, data : string = "How did this happen?";
        if (!existsSync(`./data/notes/${interaction.user.id}`)) {
            interaction.reply({
                content: "You don't have any notes!",
                ephemeral: true
            });
            return;
        }
        try {
            data = readFileSync(`./data/notes/${interaction.user.id}/${id}.txt`).toString();
        } catch (e) {
            let error = e as Error;
            if (error.message.startsWith("ENOENT")) {
                data = `Couldn't find note with ID ${id}!`;
            } else {
                data = "Couldn't fetch note!";
            }
        }

        await interaction.reply({
            content: data,
            ephemeral: true
        });
    }
} as Command;