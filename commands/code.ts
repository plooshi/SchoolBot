import { Command } from "../types.js";
import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import axios from "axios";
import * as djs from "discord.js";

const builder = new SlashCommandBuilder();
builder.setName("code");
builder.setDescription("Run stuff");
builder.addStringOption(
    new SlashCommandStringOption()
        .setName("code")
        .setDescription("Code to run")
        .setRequired(true)
);

export default {
    data: builder,
    execute: async (client, interaction) => {
        if (interaction.user.id !== "716250356803174511") return interaction.reply("Only Tom can run code on me...");
        let data = interaction.options.getString("code"), AsyncFunction = (async () => {}).constructor as FunctionConstructor;
        if (data?.startsWith("http")) {
            data = (await axios.get(data)).data as string;
        };
        let codeFunc = async () => {
            let value;
            try {
                let func = new AsyncFunction('djs', 'client', 'interaction', data as string);
                value = await func(djs, client, interaction);
            } catch (e) {
                value = `Error: \`\`\`js\n${e as string}\n\`\`\``;
            }
            return value;
        };
        let out = await codeFunc();
        if (out && out != "" && out != "undefined" && out != "null") {
            interaction.reply(out as string);
        } else {
            interaction.reply("Code did not return anything.");
        }
    }
} as Command;