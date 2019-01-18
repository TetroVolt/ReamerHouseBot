
// load environment variables
require('dotenv').config()

const https = require('https');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!reamer_ip') {
    https.get('https://ifconfig.co/json', (resp) => {
      let data = '';
      resp.on('data', (chunk) => { data += chunk; });
      resp.on('end', () => {
        data = JSON.parse(data).ip;
        msg.reply(`\`\`\`${data}\`\`\``);
      });
    }).on("error", (err) => console.error(err));
  }
});

client.login(process.env.DISCORD_CLIENT_LOGIN);

