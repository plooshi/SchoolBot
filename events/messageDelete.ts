import { Event } from "../types.js";
import { spam } from "../data.js";
import { MessageEmbed } from "discord.js";

export default {
    name: "messageDelete",
    execute: async (client, message) => {
        if (message.channel.type == 'DM' || message.author?.bot) return;
        let messageAttachment: string | undefined = message.attachments.size > 0 ? message.attachments.first()?.url : undefined;
        const embed = new MessageEmbed();
        embed.setTitle(`${message.member?.displayName} deleted a message in #${message.channel.name}!`);
        embed.addField("Content", message.content ? message.content : "Image/Embed");
        embed.setColor("#ff0000");
        embed.setTimestamp();
        if (messageAttachment) embed.setImage(messageAttachment);
        await spam.send({ embeds: [embed] });
    }
} as Event<"messageDelete">;