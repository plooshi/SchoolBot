import { Command, Event } from "../types.js";
import { cmds } from "../commands.js";
import { InteractionType } from "discord.js";

export default {
    name: "interactionCreate",
    execute: async (client, interaction) => {
        if (interaction.type != InteractionType.ApplicationCommand) return;

        cmds.forEach(async (cmd : Command) => {
            if (cmd.data.name == interaction.commandName) {
                await cmd.execute(client, interaction);
            }
        });
    }
} as Event<"interactionCreate">;