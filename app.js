
// load environment variables
require('dotenv').config()

const axios = require('axios');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (msg) => {
  if (msg.content === '!reamer_ip') {
    const message = await axios.get(
      'https://ifconfig.co/json'
    )
    .then(response => {
      let message;
      try {
        message = "Your ip is ```" + response.data.ip + "```";
      } catch (error) {
        console.error(error);
        message = "Error: ```" + error.toString() + "```";
      }
      return message;
    })
    .catch((error) => {
      console.error(error);
      return error.toString();
    });
    msg.reply(message);
  }
});

client.login(process.env.DISCORD_CLIENT_LOGIN);

