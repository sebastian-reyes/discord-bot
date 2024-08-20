const dotenv = require('dotenv');
const { Client, Events } = require("discord.js");

dotenv.config({ path: '../.env' });

const client = new Client({
    intents: 3276799
});

client.on(Events.ClientReady, async () => {
    console.log(`Conectado como ${client.user.username}`);
})

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('-')) return;

    const args = message.content.slice(1).split(' ')[0];
    try {
        const command = require(`./commands/${args}`);
        command.run(message); 
    } catch (error) {
        console.log(`Ha ocurrido un error al utilizar el comando -${args}`, error.message);
    }
})

client.login(process.env.TOKEN);