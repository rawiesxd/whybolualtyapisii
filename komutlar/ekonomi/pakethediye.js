const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args, prefix) => {
    let kişi = message.mentions.members.first()

    if(!args[0]) {
    const market = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    Selam ${message.author},
    Lütfen Bir Değer Belirtin!

    • | **${prefix}pakethediye paket1 @kişi**
    • | **${prefix}pakethediye paket2 @kişi**
    • | **${prefix}pakethediye paket3 @kişi**
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(market)
    }
    

    if(args[0] === "paket1") {
        if(db.fetch(`goldkredi_${message.author.id}`) < 5000) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Hata!
            Üzgünüm ancak **Gold Üyelik** Krediniz yeterli değil!
            Gereken Kredi: **5000**
            Sizde bulunan kredi: **${db.fetch(`goldkredi_${message.author.id}`) || 0}**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)    
        }

        if(!kişi) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Lütfen Bir Kişi Etiketleyin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.bot) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Bir Bota Paket Hediye Edemezsiniz!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.id === message.author.id) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Kendine Paket Hediye Edemezsin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }   
                let sure = getRandomInt('1', '7')
                let süre = ms(sure +"d")
                let gold = db.fetch(`goldsüre_${message.author.id}`) 
                let kanal = new Discord.WebhookClient("787280276522926091", "uFN-llu0x7WSMLVGrQR2WfmcyE9WCoiVyzUnoR2HdmNVYP0tUqj0aPhaSEvmt48hgySZ")
    
                if(db.fetch(`goldsüre_${kişi.id}`) > 2592000000) {
                    db.subtract(`goldsüre_${kişi.id}`, 86400000)
                    return message.channel.send(`Gold Üyelik Süreniz **30 Gün**'e Ulaştı ve ya **30 Gün**'ün Üstüne ulaştı daha fazla satın alamazsınız.`)
                }
    
                if(gold) {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 5000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                } else {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 5000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                 }


    }

    if(args[0] === "paket2") {
        if(db.fetch(`goldkredi_${message.author.id}`) < 15000) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Hata!
            Üzgünüm ancak **Gold Üyelik** Krediniz yeterli değil!
            Gereken Kredi: **15000**
            Sizde bulunan kredi: **${db.fetch(`goldkredi_${message.author.id}`) || 0}**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)    
        }

        if(!kişi) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Lütfen Bir Kişi Etiketleyin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.bot) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Bir Bota Paket Hediye Edemezsiniz!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.id === message.author.id) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Kendine Paket Hediye Edemezsin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }   
                let sure = getRandomInt('7', '14')
                let süre = ms(sure +"d")
                let gold = db.fetch(`goldsüre_${message.author.id}`) 
                let kanal = new Discord.WebhookClient("787280276522926091", "uFN-llu0x7WSMLVGrQR2WfmcyE9WCoiVyzUnoR2HdmNVYP0tUqj0aPhaSEvmt48hgySZ")
    
                if(db.fetch(`goldsüre_${kişi.id}`) > 2592000000) {
                    db.subtract(`goldsüre_${kişi.id}`, 86400000)
                    return message.channel.send(`Gold Üyelik Süreniz **30 Gün**'e Ulaştı ve ya **30 Gün**'ün Üstüne ulaştı daha fazla satın alamazsınız.`)
                }
    
                if(gold) {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 15000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                } else {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 15000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                 }


    }

    if(args[0] === "paket3") {
        if(db.fetch(`goldkredi_${message.author.id}`) < 25000) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Hata!
            Üzgünüm ancak **Gold Üyelik** Krediniz yeterli değil!
            Gereken Kredi: **15000**
            Sizde bulunan kredi: **${db.fetch(`goldkredi_${message.author.id}`) || 0}**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)    
        }

        if(!kişi) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Lütfen Bir Kişi Etiketleyin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.bot) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Bir Bota Paket Hediye Edemezsiniz!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }
    
        if(kişi.id === message.author.id) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Selam ${message.author},
            Kendine Paket Hediye Edemezsin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market)
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }   
                let sure = getRandomInt('14', '29')
                let süre = ms(sure +"d")
                let gold = db.fetch(`goldsüre_${message.author.id}`) 
                let kanal = new Discord.WebhookClient("787280276522926091", "uFN-llu0x7WSMLVGrQR2WfmcyE9WCoiVyzUnoR2HdmNVYP0tUqj0aPhaSEvmt48hgySZ")
    
                if(db.fetch(`goldsüre_${kişi.id}`) > 2592000000) {
                    db.subtract(`goldsüre_${kişi.id}`, 86400000)
                    return message.channel.send(`Gold Üyelik Süreniz **30 Gün**'e Ulaştı ve ya **30 Gün**'ün Üstüne ulaştı daha fazla satın alamazsınız.`)
                }
    
                if(gold) {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 25000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                } else {
                    db.add(`goldsüre_${kişi.id}`, Date.now() + süre)
                    db.subtract(`goldkredi_${message.author.id}`, 25000)
                    db.set(`üyelikk_${kişi.id}`, "aktif") 
    
                    const kazandı = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    ${kişi} (${kişi.id}) Adlı kullanıcı **${sure} Gün** Boyunca **Gold Üyelik** Kazandı!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    kanal.send(kazandı)
    
                    
                    const market = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`
                    Başarılı Bir Şekilde ${kişi} Adlı Kişiye **${sure} Gün** Boyunca **Gold Üyelik** Hediye Ettiniz!
                    `)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
                    return message.channel.send(market)
                 }


    }
    

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["paket-hediye", "hediye"]
}

exports.help = {
    name: "pakethediye",
    description: "Belirtilen Kişiye Özel Üyelik Hediye Edersiniz.",
    usage: "pakethediye"
}