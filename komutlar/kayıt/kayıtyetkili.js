const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args, prefix) => {
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Hata! Bu komutu kullanabilmek için `ROLLERİ YÖNET` yetkisine ihtiyacın var!")
    let kanal = message.mentions.roles.first()

    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Lütfen bir değer belirtin!
        
        • | **${prefix}kayıtyetkilirol ayarla @rol**
        • | **${prefix}kayıtyetkilirol sıfırla**
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
            Lütfen bir rol etiketleyin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(db.fetch(`kayıtyetkilirol_${message.guild.id}`)) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Kayıt Yetkili Rolü Zaten Ayarlanmış!

            Ayarlanmış değer: <@&${db.fetch(`kayıtyetkilirol_${message.guild.id}`)}>
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.set(`kayıtyetkilirol_${message.guild.id}`, kanal.id)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **Kayıt Yetkili Rolünü** ${kanal} olarak ayarladım!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }

    if(args[0] === "sıfırla") {
        if(!db.fetch(`kayıtyetkilirol_${message.guild.id}`)) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Kayıt Yetkili Rolü Zaten Sıfırlanmış/Ayarlanmamış!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.delete(`kayıtyetkilirol_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **Kayıt Yetkili Rolünü** sıfırladım!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-yetkili", "kayıtyetkilirol"]
}

exports.help = {
    name: "kayıtyetkili",
    description: "kayıt yetkili rolünü ayarlarsınız",
    usage: "kayıtyetkili ayarla @rol/sıfırla"
}