module.exports = function(message, args, client) {
    // if (!message.mentions.member.first()) {
    //     args[0] = args[0].toLowerCase();
    // }
    let amount = parseInt(args[1]);

    if (args[0] == "me") {
        message.channel.fetchMessages({limit: 100})
        .then(function(messages) {
            console.log(messages.size);
            let mA = messages.array();
            mA = mA.filter(function(e) {
                e.author.id === client.user.id;
            });
            mA.length = amount + 1;

            mA.map(function(e) {
                e.delete().catch(console.error);
            })
        });
    }
}