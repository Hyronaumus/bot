// This script is not of my making. I have modified it slightly (the "main" function and some other small tweaks) to seamlessly interact with my own scripts.
// I do not recall who the correct author of this script, however I have no intention of taking credit for it.



const { js_beautify } = require("js-beautify");

console.oldLog = console.log;
console.log = function(value) {
    console.oldLog(value);
    return value;
};

const reduceIndentation = (string) => {
  let whitespace = string.match(/^(\s+)/);
  if (!whitespace) return string;

  whitespace = whitespace[0].replace("\n", "");
  return string.split("\n").map(line => line.replace(whitespace, "")).join("\n");
};

const format = async (msg) => {
  const beautifiedCode = js_beautify(msg, { indent_size: 2, brace_style: "collapse", jslint_happy: true });
  const str = await reduceIndentation(beautifiedCode);
  return (`${"```js"}\n${str}\n${"```"}`);
};

const clean = function(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

const fix = async function(m, message) {
    let res;
    try {
        await format(message).then(function(r) {
            m.channel.send(":gear: **Input**\n"+r);
        })
    } catch(error) {
        m.channel.send(error);
    }   
} 
 
 
exports.main = function(client, message, args) {
    try {
        args = args.join(" ");
        let evaluated = eval(args);

        fix(message, args);
        if (typeof evaluated !== "string") { evaluated = require("util").inspect(evaluated) };
        setTimeout(function () {
            message.channel.send(`:white_check_mark: **Output**\n\`\`\`x1\n${clean(evaluated)}\n\`\`\``);
        }, 5);
        message.delete().catch(function () { });
    } catch (error) {
        message.channel.send(`:x: **Error!**\n\`\`\`x1\n${clean(error)}\n\`\`\``);
    };
}