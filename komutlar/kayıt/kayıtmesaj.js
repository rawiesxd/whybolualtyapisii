const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args, prefix) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Hata! Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine ihtiyacın var!")
    let kanal = args.slice(1).join(" ")

    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Lütfen bir değer belirtin!
        
        • | **${prefix}kayıtmesaj ayarla mesaj**
        • | **${prefix}kayıtmesaj sıfırla**
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }

    if(args[0] === "ayarla") {
        if(!kanal) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir mesaj belirtin!
            `)
            .addField("Değişkenler:", `
            • | {kullanıcı} => **Kullanıcıyı etiketler.**
            • | {kullanıcı-id} => **Kullanıcı ID'sini gösterir.**
            • | {kullanıcı-isim} => **Kullanıcı ismini gösterir.**
            • | {erkek-verilecek-rol} => **Erkek Verilecek rolü etiketler.**
            • | {erkek-verilecek-rol-id} => **Erkek Verilecek rolün ID'sini gösterir.**
            • | {erkek-verilecek-rol-isim} => **Erkek Verilecek rolün ismini gösterir.**
            • | {kız-verilecek-rol} => **Kız Verilecek rolü etiketler.**
            • | {kız-verilecek-rol-id} => **Kız Verilecek rolün ID'sini gösterir.**
            • | {kız-verilecek-rol-isim} => **Kız Verilecek rolün ismini gösterir.**
            • | {alınacak-rol} => **Alınacak rolü etiketler.**
            • | {alınacak-rol-id} => **Alınacak rolün ID'sini gösterir.**
            • | {alınacak-rol-isim} => **Alınacak rolün ismini gösterir.**
            • | {yetkili-rol} => **Yetkili rolünü etiketler.**
            • | {yetkili-rol-id} => **Yetkili rolünün ID'sini gösterir.**
            • | {yetkili-rol-isim} => **Yetkili rolünün ismini gösterir.**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(db.fetch(`kayıtmesaj_${message.guild.id}`)) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Kayıt Mesajı Zaten Ayarlanmış!

            Ayarlanmış değer: **${db.fetch(`kayıtmesaj_${message.guild.id}`)}**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.set(`kayıtmesaj_${message.guild.id}`, kanal)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **Kayıt Mesajını** ayarladım!
        `)
        .addField("Kayıt Mesajı:", `
        ${kanal.replace("{kullanıcı}", message.author)
        .replace("{kullanıcı-id}", message.author.id)
        .replace("{kullanıcı-isim}", message.author.tag)
        .replace("{erkek-verilecek-rol}", "<@&" + db.fetch(`kayıterkekrol_${message.guild.id}`) + ">" || "???")
        .replace("{erkek-verilecek-rol-id}", db.fetch(`kayıterkekrol_${message.guild.id}`) || "???")
        .replace("{erkek-verilecek-rol-isim}", message.guild.roles.cache.get(db.fetch(`kayıterkekrol_${message.guild.id}`)).name || "???")
        .replace("{kız-verilecek-rol}", "<@&" + db.fetch(`kayıtkızrol_${message.guild.id}`) + ">" || "???")
        .replace("{kız-verilecek-rol-id}", db.fetch(`kayıtkızrol_${message.guild.id}`) || "???")
        .replace("{kız-verilecek-rol-isim}", message.guild.roles.cache.get(db.fetch(`kayıtkızrol_${message.guild.id}`)).name || "???")
        .replace("{alınacak-rol}", "<@&" + db.fetch(`kayıtalınacakrol_${message.guild.id}`) + ">" || "???")
        .replace("{alınacak-rol-id}", db.fetch(`kayıtalınacakrol_${message.guild.id}`) || "???")
        .replace("{alınacak-rol-isim}", message.guild.roles.cache.get(db.fetch(`kayıtalınacakrol_${message.guild.id}`)).name || "???")
        .replace("{yetkili-rol}", "<@&" + db.fetch(`kayıtyetkilirol_${message.guild.id}`) + ">" || "???")
        .replace("{yetkili-rol-id}", db.fetch(`kayıtyetkilirol_${message.guild.id}`) || "???")
        .replace("{yetkili-rol-isim}", message.guild.roles.cache.get(db.fetch(`kayıtyetkilirol_${message.guild.id}`)).name || "???")
        }
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }

    if(args[0] === "sıfırla") {
        if(!db.fetch(`kayıtmesaj_${message.guild.id}`)) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Kayıt Mesajı Zaten Sıfırlanmış/Ayarlanmamış!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.delete(`kayıtmesaj_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **Kayıt Mesajını** sıfırladım!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-yetkili"]
}

exports.help = {
    name: "kayıtmesaj",
    description: "kayıt mesajını ayarlarsınız",
    usage: "kayıtmesaj ayarla mesaj/sıfırla"
}