const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args, prefix) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Hata! Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine ihtiyacın var!")
    
    if(!args[0]) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Lütfen bir değer belirtin!
        
        • | **${prefix}kayıtembed renk #renk**
        • | **${prefix}kayıtembed thumbnail url**
        • | **${prefix}kayıtembed image url**
        • | **${prefix}kayıtembed author yazı**
        • | **${prefix}kayıtembed footer yazı**
        • | **${prefix}kayıtembed sıfırla**
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }

    if(args[0] === "renk") {
        let renk = args.slice(1).join(" ")
        if(!renk) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir renk kodu belirtin! (renk kodları # ile başlamalıdır! örnek: #ffffff)
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(!renk.startsWith("#")) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Belirttiğiniz kod # ile başlamıyor!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(renk.length !== 7) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Renk kodlarının büyüklüğü 7 harf olmalıdır!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.set(`kayıtembedrenk_${message.guild.id}`, renk)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Başarılı bir şekilde **Kayıt Embed Rengini** ${renk} olarak ayarladım!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
    }
 
    if(args[0] === "image") {
        let renk = args[1]
        if(!renk) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir url belirtin! (urller \`http ve ya https\` ile başlamalıdır ve \`.png, .jpg, .webp, .gif\` ile bitmelidir!)
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(!renk.startsWith("http://") || !renk.startsWith("https://")) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Belirttiğiniz url \`https:// ve ya http://\` başlamıyor!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        } 

        db.set(`kayıtembedimage_${message.guild.id}`, renk)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Başarılı bir şekilde **Kayıt Embed İmagesini (Büyük Resmini)** [Tıkla](${renk}) olarak ayarladım!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
    }

    if(args[0] === "author") {
        let renk = args.slice(1).join(" ")
        if(!renk) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir yazı belirtin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(renk.startsWith("http://") || renk.startsWith("https://")) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Belirttiğiniz yazı \`https:// ve ya http://\` ile başlıyor!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        } 

        if(renk.length >= 20) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Author (Baş Yazı) mesaj uzunluğu **20** Karakteri geçmemelidir.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.set(`kayıtembedauthor_${message.guild.id}`, renk)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Başarılı bir şekilde **Kayıt Embed Authorunu (Baş Yazı)** ayarladım!
            `)
            .addField("Author Yazısı:", renk)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
    }

    if(args[0] === "footer") {
        let renk = args.slice(1).join(" ")
        if(!renk) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir yazı belirtin!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        if(renk.startsWith("http://") || renk.startsWith("https://")) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Belirttiğiniz yazı \`https:// ve ya http://\` ile başlıyor!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        } 

        if(renk.length >= 20) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Footer (Alt Yazı) mesaj uzunluğu **20** Karakteri geçmemelidir.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }

        db.set(`kayıtembedfooter_${message.guild.id}`, renk)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Başarılı bir şekilde **Kayıt Embed Footerını (Alt Yazı)** ayarladım!
            `)
            .addField("Footer Yazısı:", renk)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
    }

    if(args[0] === "sıfırla") {
        db.delete(`kayıtembedrenk_${message.guild.id}`)
        db.delete(`kayıtembedthumbnail_${message.guild.id}`)
        db.delete(`kayıtembedimage_${message.guild.id}`)
        db.delete(`kayıtembedauthor_${message.guild.id}`)
        db.delete(`kayıtembedfooter_${message.guild.id}`)
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **Kayıt Embed** Ayarlarınızı sıfırladım.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }


}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-embed"]
}

exports.help = {
    name: "kayıtembed",
    description: "kayıt embedini ayarlarsınız",
    usage: "kayıtembed <renk, thumbnail, image, author, footer/sıfırla>"
}