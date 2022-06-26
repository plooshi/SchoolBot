import { Event } from "../types.js";
import { spam } from "../data.js";
import { MessageEmbed } from "discord.js";
import { everyone } from "../data.js";

export default {
    name: "guildMemberRemove",
    execute: async (client, member) => {
        let roles = member.roles.cache.sort((r1, r2) => r1.rawPosition - r2.rawPosition).filter(r => r.id != everyone).map(r => r.name).join(", ");
        const embed = new MessageEmbed();
        embed.setTitle(`${member.displayName} left the server!`);
        embed.setColor("#0000ff");
        embed.addField("Roles", roles == "" ? "No roles" : roles);
        embed.setTimestamp();
        await spam.send({ embeds: [embed] });
    }
} as Event<"guildMemberRemove">;