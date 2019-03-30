const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const [Discord, Settings, fs] = [require("discord.js"), require("./settings.json"), require("fs")];

const Client = new Discord.Client();

Client.on("ready", function () {
    console.log(`Ready to serve on ${Client.guilds.size} servers for ${Client.users.size} users.`);

});

Client.on("messageDelete", function (message) {

    //verify i can send message to delete channel in command center (command center = guild where i can talk to my bot)
    //require logMessageDelete command which is formatted as an embed message

    try {
        let [authorType, channelType] = [null, null];
        if (message.channel.type == "text") {
            channelType = `${message.channel.name}, ${message.member.guild.name}`
            authorType = `${message.author.username}#${message.author.discriminator} (${message.author.nickname})`
        } else if (message.channel.type == "group") {
            channelType = `${message.channel.name}`
            authorType = `${message.author.username}#${message.author.discriminator}`

        } else if (message.channel.type == "dm") {
            channelType = `${message.channel.recipient.username}#${message.channel.recipient.discriminator}`
            authorType = `${message.author.username}#${message.author.discriminator}`
        };

        let static_channels = JSON.parse(fs.readFileSync("databases/static_channels.json", "utf8"));
        let embed = new Discord.RichEmbed()
            .setTitle("Type: Message Delete")
            .addField("Deleted from:", channelType, true)
            .addField("Deleted content:", message.content, true)
            .addField("Message author:", authorType, true)
            .setFooter("Logging")
            .setTimestamp()
            .setColor("RED");

        Client.channels.find("id", static_channels[Settings.CommandCenter]["bot_feedback"]).send({ embed });
    } catch (e) { console.log(e) };
});

Client.on("message", function (message) {
    if (Settings.LogMessages == true) {
      let r;
        try {
            r = "!ERROR 0x01!"
            if (message.channel.type == "text") {
                let n = message.member.nickname && ` (${message.member.nickname})` || "";
                r = `\r\n<${message.createdAt}>!GUILD ${message.guild} @ ${message.channel.name}: ${message.author.username}#${message.author.discriminator}${n} said: "${message.content}"`
            } else if (message.channel.type == "group") {
                r = `\r\n<${message.createdAt}>!GROUP ${message.channel.name}: ${message.author.username}#${message.author.discriminator} said: "${message.content}"`;
            } else if (message.channel.type == "dm") {
                r = `\r\n<${message.createdAt}>!DM ${message.channel.recipient.username}#${message.channel.recipient.discriminator}: ${message.author.username}#${message.author.discriminator} said: "${message.content}"`;
            }
        } catch (e) { console.log(e) };
        fs.appendFileSync("./records/log.txt", r, function (error) { if (error) { console.log(error) }; });
        console.log(r);
    }

    if ((message.author.id != Settings.Author) || (!message.content.startsWith(Settings.Prefix))) { return };

    const args = message.content.slice(Settings.Prefix.length).trim().split(/ +/g);
    const category = args.shift().toLowerCase();
    const command = args.shift().toLowerCase();

    try {
        let mod = require(`./commands/${category}/${command}`);
        if (mod) { mod.main(Client, message, args); }
    } catch (e) { console.log(e) };
});

Client.login(Settings.Token);