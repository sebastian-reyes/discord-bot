const dotenv = require('dotenv');
const { Client, Events } = require("discord.js");

dotenv.config({ path: '../.env' });

const client = new Client({
    intents: 3276799
});

client.on(Events.ClientReady, async () =>{
    console.log(`Conectado como ${client.user.username}`);
})

client.login(process.env.TOKEN);