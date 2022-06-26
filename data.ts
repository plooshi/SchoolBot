import { Guild, TextChannel } from 'discord.js';

export var spam: TextChannel;

export function updateSpam(guild : Guild | null) {
    if (!spam) spam = guild?.channels.cache.find(c => c.id == spamid) as TextChannel;
}


export let spamid = '985381412158976030', guild = '889624781731794944', everyone = guild, token = "Nzg0NTAzMjY2NjM3MjUwNjIw.G8KxKw.AQA4iAYAnuPM6hulZgZ9ppUeSZLTnbGnHF3aHY";