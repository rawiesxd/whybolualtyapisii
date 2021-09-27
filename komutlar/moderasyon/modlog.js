const db = require("quick.db")
const Discord = require("discord.js")
exports.run = async (client, message, args, prefix) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yönetici yetkin yok!")

    let rol = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Eğer mod log kanalını ayarlamak istiyorsan bir değer belirt!\n**${prefix}modlog ayarla #kanal** veya **${client.ayarlar.prefix}modlog sıfırla**`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
    }

    if(args[0] === "ayarla") {
        if(db.has(`modlog_${message.guild.id}`) === true) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Malesef, Ayarlanmış bir şeyi tekrar ayarlayamazsın (<#${db.fetch(`modlog_${message.guild.id}`)}>).`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
        }

        if(!rol) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Eğer **Mod Logu**'nu ayarlamak istiyorsan bir kanal etiketle!`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
        }

        db.set(`modlog_${message.guild.id}`, rol.id)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde **Mod Logu** ayarlandı! (${rol})`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
    }

    if(args[0] === "sıfırla") {
        if(!db.has(`modlog_${message.guild.id}`) === true) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Malesef, Ayarlanmamış ve ya Sıfırlanmış bir şeyi tekrardan sıfırlayamazsın.`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
        }

        db.delete(`modlog_${message.guild.id}`)
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde **Mod Logu** sıfırlandı!`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
    }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["mod-log"]
}

exports.help = {
    name: "modlog",
    description: "Mod log kanalını ayarlarsınız.",
    usage: "w!modlog <ayarla #log/sıfırla>"
}