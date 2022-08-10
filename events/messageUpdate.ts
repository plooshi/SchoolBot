import { Event } from "../types.js";
import { spam } from "../data.js";
import { ChannelType, EmbedBuilder } from "discord.js";

export default {
    name: "messageUpdate",
    execute: async (client, oldMessage, newMessage) => {
        if (newMessage.channel.type == ChannelType.DM || oldMessage.author?.bot || oldMessage.content == newMessage.content) return;
        const embed = new EmbedBuilder();
        embed.setTitle(`${newMessage.member?.displayName} edited a message in #${newMessage.channel.name}!`);
        embed.addFields([{ name: "Old message", value: oldMessage.content ? oldMessage.content : "Image/Embed" }]);
        embed.addFields([{ name: "New message", value: newMessage.content ? newMessage.content : "Image/Embed" }]);
        embed.setColor("#00ff00");
        embed.setTimestamp();
        await spam.send({ embeds: [embed] });
    }
} as Event<"messageUpdate">;