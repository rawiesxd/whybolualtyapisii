const Discord = require("discord.js");
const db = require('quick.db');
exports.run = async (client, message, args) => {
  if(message.author.id !== "440575579335557121") return message.reply("Sen sahibim değilsin!")
  let user = args[0]
  if (!user) {
    let e = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription("Kara listeye almak istediğin kullanıcının id sini yaz!")
    message.channel.send({embed: e})
    return;
  };
  
  
  
  db.set(`sunucukaraliste_${user}`, "aktif")
    
  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`${user} idli sunucuyu başarıyla karalisteye alındı!`)
    message.channel.send({embed: embed})
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["serverblacklist", "sunucu-kara-liste"]
};

exports.help = {
  name: "sunucukaraliste",
  description: "Belirtilen sunucuyu kara listeye alır!",
  usage: "sunucukaraliste <sunucu ID>"
};