const Discord = require("discord.js")
const superagent = require('superagent')
exports.run = async (client, message) => {

if (message.channel.nsfw === true) {
  superagent.get('https://nekobot.xyz/api/image').query({ type: 'ass'}).end((err, response) => {
   // msg.channel.send({ file: response.body.message });
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.embedRenk)
  .setImage(response.body.message)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
  return message.channel.send(embed)
  });
} else {
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`Hata! Bu kanal **NSFW** olmadığı için belirtilen komutu çalıştıramadım!`)
 // .setImage("")
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
  return message.channel.send(embed)
}

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "ass",
    description: "Ass Gifler Atar. (+18)",
    usage: "w!ass"
}