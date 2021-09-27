const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args, prefix) => {
     
    if(db.fetch(`goldkredi_${message.author.id}`) < 25000) {
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Hata!
        Üzgünüm ancak **Gold Üyelik** Krediniz yeterli değil!
        Gereken Kredi: **25000**
        Sizde bulunan kredi: **${db.fetch(`goldkredi_${message.author.id}`) || 0}**
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market)    
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }  
            let min = '14'
            let max = '29'
            let sure = getRandomInt('14', '29')
            let süre = ms(sure +"d")
            let gold = db.fetch(`goldsüre_${message.author.id}`) 
            let kanal = new Discord.WebhookClient("787280276522926091", "uFN-llu0x7WSMLVGrQR2WfmcyE9WCoiVyzUnoR2HdmNVYP0tUqj0aPhaSEvmt48hgySZ")

			if(db.fetch(`goldsüre_${message.author.id}`) > 2592000000) {
                db.subtract(`goldsüre_${message.author.id}`, 86400000)
                return message.channel.send(`Gold Üyelik Süreniz **30 Gün**'e Ulaştı ve ya **30 Gün**'ün Üstüne ulaştı daha fazla satın alamazsınız.`)
            }

			if(gold) {
                db.add(`goldsüre_${message.author.id}`, Date.now() + süre)
                db.subtract(`goldkredi_${message.author.id}`, 25000)
                db.set(`üyelikk_${message.author.id}`, "aktif") 

                const kazandı = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`
                ${message.author} (${message.author.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                kanal.send(kazandı)

                const market = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`
                Başarılı bir şekilde **${sure} Gün** Boyunca **Gold Üyelik** Kazandınız!
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                return message.channel.send(market)
            } else {
                db.set(`goldsüre_${message.author.id}`, Date.now() + süre)
                db.subtract(`goldkredi_${message.author.id}`, 25000)
                db.set(`üyelikk_${message.author.id}`, "aktif") 

                const kazandı = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`
                ${message.author} (${message.author.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                kanal.send(kazandı)

                
                const market = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`
                Başarılı bir şekilde **${sure} Gün** Boyunca **Gold Üyelik** Kazandınız!
                `)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                return message.channel.send(market)
             }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["emerald"]
}

exports.help = {
    name: "zümrüt",
    description: "zümrüt kasasını açarsınız.",
    usage: "zümrüt"
}