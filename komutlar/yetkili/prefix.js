const Discord = require("discord.js")
const db = require("quick.db")
const path = require("path")
exports.run = async (client, message, args, prefix) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yönetici Yetkin Yok!")
  
    let prefixx = args.slice(1).join(" ")

    let kufur = ["@everyone", "@here"]
    let kufurr = path.resolve("src", "küfürler.json")
    
    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Eğer botun prefixini (ön ekini) değiştirmek istiyorsan bir değer belirt!\n> Örnek: **${prefix}prefix ayarla prefix** veya **${prefix}prefix sıfırla**`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }

    if(args[0] === "ayarla") {
        if(!prefixx) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Merhaba sayın ${message.author}, Eğer botun prefixini (ön ekini) değiştirmek istiyorsan bir prefix belirt!`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed)
        }

        if(prefixx.length >= 5) return message.channel.send("Prefix uzunluğu 5 harften uzun olamaz!")

        if(message.content === kufur.some) {
            return message.channel.send("Prefixin içeriği \`everyone\` veya \`here\` içermemelidir!")
        }

        if(message.content === kufurr.some) {
            return message.channel.send("Prefixin içeriği küfür içermemelidir!")
        }

        db.set(`prefix_${message.guild.id}`, prefixx)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde botun prefixi **${prefixx}** Olarak ayarlandı!`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }

    if(args[0] === "sıfırla") {
        db.delete(`prefix_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde botun prefixi sıfırlandı!`)
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
    name: "prefix",
    description: "Prefixi değiştirirsiniz.",
    usage: "w!prefix <ayarla prefix/sıfırla>"
}