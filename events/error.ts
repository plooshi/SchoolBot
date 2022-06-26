import { spam } from '../data.js';
import { Event } from '../types.js';
export default {
    execute: async (client, error) => {
        spam.send("***Error***: ```js\n" + error.message + "\n```");
    }
} as Event<"error">;