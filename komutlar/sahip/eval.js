const Discord = require("discord.js");
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
const ms = require("ms")
exports.run = async(client, message, args) => {
    if (message.author.id !== "440575579335557121") return message.reply("Sen sahibim değilsin!")
    const charCheck = (str, max = 1024) => (str.length > max) ? str.slice(0, max - 3) + "..." : str;
    let id = random(6);
    function random(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

    try {
        let codein = args.join(" ");
        let code = eval(codein);
        if(codein.includes("token")) return message.channel.send("Bir sen akıllısın değilmi .p")
        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription("```js\n" + charCheck(code) + "```")
        // .addField(':inbox_tray: Giriş:', `\`\`\`js\n${charCheck(codein)}\`\`\``)
       // .addField(':outbox_tray: Çıkış', `\`\`\`js\n${charCheck(code)}\n\`\`\``)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${charCheck(e)}\n\`\`\``);
    }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'eval',
  description: 'Kod çalıştırır.',
  usage: 'eval <kod>'
};