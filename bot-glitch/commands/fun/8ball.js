const [Discord, questions, responses, Numbers] = 

[require("discord.js"), 
["Would you like to ||get fucked so hard you lose every ounce of sanity you have||?","Do you support B.T.?","Should I commit suicide?","Is herp gay?", "Is Hillary a crook?", "Does Drew love himself?", "Ok wow so no cock and ball torture?", "Not a question but ||curious george nigga lookin ass||?", "Did X deserve to die?", "Tits or as- wait, that's not a yes or no question?", "Tbh most of these questions are being written as I listen to a rap song that's basically screaming 'pussy ass nigga' and shit like that lol"], 
["||no engles sory||", "Probably not.", "Maybe.", "Absolutely!", "It is not favorable.", "That's a negative sir.", "That's affirmative sir.", "Absolutely not!", "mom says no", "mom says yes", "CATALINA SAID YES", "catalina said no"], 
require("../../modules/numbers")];

exports.main = function (Client, message, args) {
    let q = args[0] && args.join(" ") || questions[Numbers.returnRandomInteger(0, questions.length)];

    if (q.substring(q.length-1, q.length) != "?") {
        q = `${q}?`;
    }

    let embed = new Discord.RichEmbed()
    .addField("Question", q, true)
    .addField("Response", responses[Numbers.returnRandomInteger(0, responses.length)], true)
    .setColor("BLACK");

    message.channel.send({embed});
    message.delete().catch();
}