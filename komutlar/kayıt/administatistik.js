const Discord = require("discord.js")
const db = require("quick.db")
const moment = require('moment');
moment.locale('tr');
exports.run = async(client, message, args, prefix) => {
    let kişi = message.mentions.members.first() || message.author
    let erkek = db.fetch(`erkekkayıt_${kişi.id}_${message.guild.id}`) || 0
    let kız = db.fetch(`kızkayıt_${kişi.id}_${message.guild.id}`) || 0

    if(db.has(`kayıt_${kişi.id}_${message.guild.id}`) === true) {
        let data = db.get(`kayıt_${kişi.id}_${message.guild.id}`)
        var list = Object.keys(data).map(_data => {
            return {
                id: (data[_data].kayıtEttiğiKişi),
                kayıtZaman: (data[_data].kayıtZaman),
                tür: (data[_data].kayıtTürü)
            };
        })
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    ${kişi} Adlı kişinin **Admin İstatistikleri**;
    `)
    .addField("Kayıt Bilgileri:", `
    • | Toplam kayıt sayısı: **${erkek + kız}**
    • | Erkek kayıt sayısı: **${erkek}**
    • | Kız kayıt sayısı: **${kız}**
    `)
    .addField("Kayıt Logları:", `${list.splice(0, 5).map((item, index) => `**${index + 1}.** <@${item.id}> [Kayıt Türü: **${item.tür}** - Zaman: **${item.kayıtZaman}**]`).join("\n")}`)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(embed)
    } else {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    ${kişi} Adlı kişinin **Admin İstatistikleri**;
    `)
    .addField("Kayıt Bilgileri:", `
    • | Toplam kayıt sayısı: **${erkek + kız}**
    • | Erkek kayıt sayısı: **${erkek}**
    • | Kız kayıt sayısı: **${kız}**
    `)
    .addField("Kayıt Logları:", "Yok")
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(embed)
    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["admin-istatistik", "adminbilgi", "admin-bilgi"]
}

exports.help = {
    name: "administatistik",
    description: "belirtilen kişinin kayıt istatistiklerine bakarsınız",
    usage: "administatistik @kişi"
}