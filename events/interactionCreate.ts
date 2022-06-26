import { Command, Event } from "../types.js";
import { cmds } from "../commands.js";

export default {
    name: "interactionCreate",
    execute: async (client, interaction) => {
        if (!interaction.isCommand()) return;

        cmds.forEach(async (cmd : Command) => {
            if (cmd.data.name == interaction.commandName) {
                await cmd.execute(client, interaction);
            }
        });
    }
} as Event<"interactionCreate">;