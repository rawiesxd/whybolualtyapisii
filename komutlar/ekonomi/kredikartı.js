const Discord = require("discord.js")
const db = require("quick.db")
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args, prefix) => {
    if(!args[0]) {
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Lütfen bir değer belirt!
        Değerler: \`${prefix}kredikartı <oluştur/sil>\`
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 
    }

    if(args[0] === "oluştur") {
        let id = makeid(16)
        if(db.fetch(`kredikartılimit_${message.author.id}`) >= 5) return message.channel.send("Kredi kartı limitinize ulaştınız!")

        db.push(`kredikartı_${message.author.id}`, { numara: id, sahip: message.author.id, zaman: moment(Date.now()).format('DD/MM/YYYY HH:mm'), para: 0 })
        db.add(`kredikartılimit_${message.author.id}`, 1)
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde kredi kartınız oluşturuldu!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 
    
    }

    if(args[0] === "sil") {
        let id = args[1]
        let linkler = db.fetch(`kredikartı_${message.author.id}`)
        if(!id) return message.channel.send("Lütfen silinecek kredi kartının barkodunu belirtin!")

        if(!linkler.filter(a => a.sahip === message.author.id).find(c => c.numara === id)) {
            const yardım = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.renk)
            .setDescription(`
            Hata!
            Sistemimde belirttiğin numara sana ait değil ve ya bulunamadı.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(yardım)
        }

        if(!db.has(`kredikartı_${message.author.id}`) === true) {
            const yardım = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.renk)
            .setDescription(`
            Hata!
            Sana ait bir kredi kartı yok! bu yüzden bu komutu kullanamazsın!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(yardım)
        }

        if(linkler.length === 1) {
            db.delete(`kredikartı_${message.author.id}`)
            db.delete(`kredikartılimit_${message.author.id}`)
            const yardım = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.renk)
            .setDescription(`
            Başarılı bir şekilde belirttiğiniz barkodu sistemimden kaldırdım!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(yardım)
        } else {
            db.set(`kredikartı_${message.author.id}`, linkler.filter(s => s.numara !== id))
            db.subtract(`kredikartılimit_${message.author.id}`, 1)
            const yardım = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.renk)
            .setDescription(`
            Başarılı bir şekilde belirttiğiniz barkodu sistemimden kaldırdım!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(yardım)
        }
    } 

    function makeid(length) {
        var result = "";
        var characters =
          "0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "kredikartı",
    description: "kredi kartı oluşturur/silersiniz.",
    usage: "kredikartı <oluştur/sil numara>"
}