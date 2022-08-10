import { spam } from "../data.js";
import { EmbedBuilder } from "discord.js";
import { Event } from "../types.js";

export default {
    name: "guildMemberAdd",
    execute: async (client, member) => {
        const embed = new EmbedBuilder();
        embed.setTitle(`${member.displayName} joined the server!`);
        embed.setColor("#0000ff");
        embed.setTimestamp();
        await spam.send({ embeds: [embed] });
    }
} as Event<"guildMemberAdd">;