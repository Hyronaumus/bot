<<<<<<< HEAD
const [fs, request, Numbers] = [require("fs"), require("request"), require("../../modules/numbers.js")];
=======
const [fs, request, Numbers] = [require("fs"), require("request"), require("../../../selfboat/modules/numbers.js")];
>>>>>>> 7ea92da584255bfebeff3f97ba5c205dbc7ea42b

exports.main = function (Client, message, args) {
    if (!message.member) { return };

    try {
        if (message.channel.nsfw == false) { return };
        
        request.get(`http://api.oboobs.ru/boobs/get/${Numbers.returnRandomInteger(7, 5999)}`, (error, response, body) => {
            if (error) { console.log (error); return };
<<<<<<< HEAD
            message.channel.send(`http://media.oboobs.ru/boobs_preview/${body.match(/\d+.jpg/g)}`);
=======
            message.channel.send(`http://media.oboobs.ru/butts_preview/${body.match(/\d+.jpg/g)}`);
>>>>>>> 7ea92da584255bfebeff3f97ba5c205dbc7ea42b
        });
    } catch (e) { console.log(e) };
}
