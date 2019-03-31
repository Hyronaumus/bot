const [Discord, Settings] = [require("discord.js"), require("../../settings.json")];

exports.main = function (Client, message, args) {
    Client.destroy().then(function(){
        Client.login(Settings.Token);
    })
}