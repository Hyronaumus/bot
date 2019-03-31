exports.main = function (Client, message, args) {
    message.channel.send(`API Latency is ${Math.round(Client.ping)}ms.`)
    message.delete().catch();
}