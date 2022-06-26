import { spam } from "../data.js";
import { MessageEmbed } from "discord.js";
import { Event } from "../types.js";

export default {
    name: "guildMemberUpdate",
    execute: async (client, oldMember, newMember) => {
        let oldRoleIDs: string[] = [];
        oldMember.roles.cache.each(role => {
            oldRoleIDs.push(role.id);
        });

        let newRoleIDs: string[] = [];
        newMember.roles.cache.each(role => {
            newRoleIDs.push(role.id);
        });

        if (newRoleIDs.length > oldRoleIDs.length) {
            function filterOutOld(id: string) {
                for (let i = 0; i < oldRoleIDs.length; i++) {
                    if (id === oldRoleIDs[i]) {
                        return false;
                    }
                }
                return true;
            }

            let onlyRole = newRoleIDs.filter(filterOutOld);
            let IDNum = onlyRole[0];

            const newRoleAdded = new MessageEmbed()
                .setTitle(`Role added to ${newMember.displayName}`)
                .addField("Role", `<@&${IDNum}>`)
                .setColor("#00ff00")
                .setTimestamp();

            await spam.send({ embeds: [newRoleAdded] });
        } else if (newRoleIDs.length < oldRoleIDs.length) {
            function filterOutNew(id: string) {
                for (let i = 0; i < newRoleIDs.length; i++) {
                    if (id === newRoleIDs[i]) {
                        return false;
                    }
                }
                return true;
            }

            let onlyRole = oldRoleIDs.filter(filterOutNew);
            let IDNum = onlyRole[0];

            const newRoleAdded = new MessageEmbed()
                .setTitle(`Role removed from ${newMember.displayName}`)
                .addField("Role", `<@&${IDNum}>`)
                .setColor("#ff0000")
                .setTimestamp();

            await spam.send({ embeds: [newRoleAdded] });
        }

        if (oldMember.nickname !== newMember.nickname) {
            const newNickname = new MessageEmbed()
                .setTitle(`${newMember.displayName} changed their nickname!`)
                .addField("Old nickname", oldMember.nickname == null ? "None" : oldMember.nickname)
                .addField("New nickname", newMember.nickname == null ? "None" : newMember.nickname)
                .setColor("#0000ff")
                .setTimestamp();
            await spam.send({ embeds: [newNickname] });
        }
    }
} as Event<"guildMemberUpdate">;