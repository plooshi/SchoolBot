import { Client, Intents } from "discord.js";
import { readdirSync } from 'fs';
import { Event } from './types.js';
import { token, spam } from "./data.js";
const client = new Client({ intents: new Intents(32767) });
const eventFiles = readdirSync('./out/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const req : any = (await import(`./events/${file}`)).default;
	const event : Event<typeof req> = req;
	client.on(event.name, async (...args) => {
		try {
			await event.execute(client, ...args);
		} catch (e) {
			spam.send(`Error: ${(e as Error).message}`);
		}
	});
}

await client.login(token);