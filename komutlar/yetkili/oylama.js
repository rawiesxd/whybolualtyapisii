const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args, prefix) => {
      
    let yazı = args.slice(0).join(" ")
    if(!yazı) return message.channel.send("Lütfen oylamada yazacak yazıyı bildirin!")

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    Oylama:
    
    **${yazı}**
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(embed).then(sa => {
        sa.react("✅")
        sa.react("❌")
    }) 

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "oylama",
    description: "oylama yaparsınız.",
    usage: "oylama <yazı>"
}