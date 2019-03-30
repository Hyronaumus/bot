const [Discord, fs, Settings] = [require("discord.js"), require("fs"), require("../../settings.json")];
let static_channels = JSON.parse(fs.readFileSync("databases/static_channels.json", "utf8"));

exports.main = function (Client, message, args) {
    let amount = parseInt(args[0]);

    message.channel.fetchMessages({ limit: 100 })
        .then(function (messages) {
            let mA = messages;
            mA = mA.filter(function (e) {
                e.author.id == Client.user.id;
            });
            //mA.length = amount + 1;

            for (let i; i < mA.length; i++) {
                console.log(mA[i]);
                mA[i].delete();
            }
        });

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
        let embed = new Discord.RichEmbed()
            .setTitle("Type: Bulk Message Delete")
            .addField("Deleted from:", channelType, true)
            .addField("Deleted amount:", amount, true)
            .addField("Message author:", authorType, true)
            .setFooter("Logging")
            .setTimestamp()
            .setColor("RED");

        Client.channels.find("id", static_channels[Settings.CommandCenter]["bot_feedback"]).send({ embed });
    } catch (e) { console.log(e) };
}