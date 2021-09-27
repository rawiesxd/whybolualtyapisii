const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yönetici yetkin yok!")

    const member = message.mentions.users.filter(s => s.ID !== client.user).first()
    if(!member) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Eğer bir kişiye uyarı vermek istiyorsan o kişiyi etiketlemen lazım!`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }

    
    if(member === message.author.id) return message.channel.send("Kendine uyarı veremezsin!")
    if(member === client.user.id) return message.channel.send("Kendime uyarı veremem!")
     
    db.delete(`uyarı_${member.id}_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde ${member} kişisinin tüm uyarılarını sildim!`)
    .addField("Kişi Bilgileri:", `> Adı: ${member.username}\n> İD: ${member.id}\n> Etiket: ${member}`)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyarıtemizle"]
}

exports.help = {
    name: "warnclear",
    description: "uyarıları temizler.",
    usage: "w!uyarıtemizle @kişi"
}