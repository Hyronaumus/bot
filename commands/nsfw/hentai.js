const [defaults, Numbers] = [["pussy", "big breasts", "group", "anal", "stockings", "nakadashi", "rape", "glasses", "defloration", "blowjob", "ahegao", "schoolgirl", "full color", "yaoi", "double penetration", "mind break", "milf", "paizuri", "yuri", "schoolgirl uniform"], require("../../modules/numbers.js")];

exports.main = function (Client, message, args) {
    if (!message.member) { return };

    let tag = args.join(" ");
    tag = tag.length > 0 && tag || defaults[Numbers.returnRandomInteger(0, defaults.length)];
    console.log(tag);

    try {
        if (message.channel.nsfw == false) { return };

        let x = require("xml2js");
        require("superagent").post("http://rule34.xxx/index.php").query({
            page: "dapi",
            s: "post",
            q: "index",
            tags: tag
        }).end(function (e, result) {
            if (!e || result.status == 200) {
                if (result.text.length < 75) { console.log(`Could not find hentai image based on tag: ${tag}.`); return };
                x.parseString(result.text, function (error, response) {
                    let postToFetch = Math.floor(Math.random() * response.posts.post.length);
                    message.channel.send(`${response.posts.post[postToFetch].$.file_url}`);

                })
            }
        });
    } catch (e) { console.log(e) };
}