import { spam } from "../data.js";
import { EmbedBuilder } from "discord.js";
import { Event } from "../types.js";

export default {
    name: "guildMemberUpdate",
    execute: async (client, oldMember, newMember) => {
        let oldRoleIDs: string[] = [];
        oldMember.roles.cache.each(role => {
            if (role.name == "._. lol") return;
            oldRoleIDs.push(role.id);
        });

        let newRoleIDs: string[] = [];
        newMember.roles.cache.each(role => {
            if (role.name == "._. lol") return;
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

            const newRoleAdded = new EmbedBuilder();
            newRoleAdded.setTitle(`Role added to ${newMember.displayName}`);
            newRoleAdded.addFields([{ name: "Role", value: `<@&${IDNum}>` }]);
            newRoleAdded.setColor("#00ff00");
            newRoleAdded.setTimestamp();

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

            const newRoleAdded = new EmbedBuilder();
            newRoleAdded.setTitle(`Role removed from ${newMember.displayName}`);
            newRoleAdded.addFields([{ name: "Role", value: `<@&${IDNum}>` }]);
            newRoleAdded.setColor("#ff0000");
            newRoleAdded.setTimestamp();

            await spam.send({ embeds: [newRoleAdded] });
        }

        if (oldMember.nickname !== newMember.nickname) {
            const newNickname = new EmbedBuilder();
            newNickname.setTitle(`${newMember.displayName} changed their nickname!`);
            newNickname.addFields([{ name: "Old nickname", value: oldMember.nickname == null ? "None" : oldMember.nickname }]);
            newNickname.addFields([{ name: "New nickname", value: newMember.nickname == null ? "None" : newMember.nickname }]);
            newNickname.setColor("#0000ff");
            newNickname.setTimestamp();
            await spam.send({ embeds: [newNickname] });
        }
    }
} as Event<"guildMemberUpdate">;