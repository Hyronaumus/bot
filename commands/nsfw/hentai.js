const [Discord, fs, Settings, defaults, Numbers] = [require("discord.js"), require("fs"), require("../../settings.json"), ["pussy", "big breasts", "group", "anal", "stockings", "nakadashi", "rape", "glasses", "defloration", "blowjob", "ahegao", "schoolgirl", "full color", "yaoi", "double penetration", "mind break", "milf", "paizuri", "yuri", "schoolgirl uniform"], require("../../modules/numbers.js")];

exports.main = function (Client, message, args) {
    if (!message.member) { return };

    let tag = args.join(" ");

    retry(false);
    function retry(initFail) {
        try {
          if (!initFail) {
            tag = tag.length > 0 && tag || defaults[Numbers.returnRandomInteger(0, defaults.length)];
            console.log(tag);
          } else {
            tag = defaults[Numbers.returnRandomInteger(0, defaults.length)];
            console.log(tag);
          }
            if (message.channel.nsfw == false) { return };

            let x = require("xml2js");
            require("superagent").post("http://rule34.xxx/index.php").query({
                page: "dapi",
                s: "post",
                q: "index",
                tags: tag
            }).end(function (e, result) {
                if (!e || result.status == 200) {
                    if (result.text.length < 75) { 
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
                            .setTitle("Type: Bad Search Tag")
                            .addField("From:", channelType, true)
                            .addField("Tag: ", tag, true)
                            .setFooter("Logging")
                            .setTimestamp()
                            .setColor("RED");

                        Client.channels.find("id", static_channels[Settings.CommandCenter]["bot_feedback"]).send({ embed });
                    } catch (e) { console.log(e) };                    
                      console.log(`Could not find hentai image based on tag: ${tag}.`); 
                      retry(true);
                      return; 
                    };
                    x.parseString(result.text, function (error, response) {
                        let postToFetch = Math.floor(Math.random() * response.posts.post.length);
                        message.channel.send(`${response.posts.post[postToFetch].$.file_url}`);
                        return;
                    })
                }
            });
        } catch (e) { console.log(e) };
    }
}