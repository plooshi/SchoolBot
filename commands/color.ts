import { Command } from "../types.js";
import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";
import { HexColorString, EmbedBuilder, CommandInteractionOptionResolver } from "discord.js";

const builder = new SlashCommandBuilder();
builder.setName("color");
builder.setDescription("Shows info about a color");
builder.addStringOption(
    new SlashCommandStringOption()
        .setName("code")
        .setDescription("Formats: RGB (0, 127, 255), Hex (#abcdef)")
        .setRequired(true)
)

export default {
    data: builder,
    execute: async (client, interaction) => {
        const baseCode = (interaction.options as CommandInteractionOptionResolver).getString("code");
        let code : string, rgb : string[] | undefined;
        if (!baseCode?.startsWith("#")) {
            rgb = baseCode?.split(", ");
            let hexify = (num : string) => {
                let parsed = parseInt(num).toString(16);
                if (parsed.length < 2) {
                    parsed = `0${parsed}`;
                }
                return parsed;
            };
            code = `#${rgb?.map(hexify).join("")}`;
        } else {
            code = baseCode;
            rgb = code.replace("#", "").match(/.{2}/g)?.map(c => parseInt(c, 16).toString()) as string[];
        }
        let nameColor = (num? : number) => {
            return num == 0 ? "red" : num == 1 ? "green" : "blue";
        };
        let rgbPer = () => {
            return rgb?.map(num => `${((parseFloat(num) / 255) * 100).toFixed(2).replace(".00","").toString()}% ${nameColor(rgb?.indexOf(num))}`).join(", ");
        }
        const embed = new EmbedBuilder();
        embed.setTitle(code);
        embed.setColor(code as HexColorString);
        embed.setDescription(`${rgbPer()}`);
        interaction.reply({ embeds: [embed] });
    }
} as Command;