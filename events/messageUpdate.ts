import { Event } from "../types.js";
import { spam } from "../data.js";
import { MessageEmbed } from "discord.js";

export default {
    name: "messageUpdate",
    execute: async (client, oldMessage, newMessage) => {
        if (newMessage.channel.type == 'DM' || oldMessage.author?.bot || oldMessage.content == newMessage.content) return;
        const embed = new MessageEmbed();
        embed.setTitle(`${newMessage.member?.displayName} edited a message in #${newMessage.channel.name}!`);
        embed.addField("Old message", oldMessage.content ? oldMessage.content : "Image/Embed");
        embed.addField("New message", newMessage.content ? newMessage.content : "Image/Embed");
        embed.setColor("#00ff00");
        embed.setTimestamp();
        await spam.send({ embeds: [embed] });
    }
} as Event<"messageUpdate">;