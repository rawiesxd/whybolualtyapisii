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
        Değerler: \`${prefix}kredi <bilgi/transfer @kişi miktar>\`
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 
    }
 
    if(args[0] === "transfer") {
        let miktar = args[2]
        let kişi = message.mentions.members.first()

        if(!kişi) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen bir kişi etiketleyin.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(!miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen gönderilecek miktarı belirtin.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(!db.fetch(`goldkredi_${message.author.id}`)) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Hiç Bir Gold Kredisine Sahip Değilsiniz!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(db.fetch(`goldkredi_${message.author.id}`) < miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Gold Kredinızda **${miktar}** Miktarında kredi yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        db.subtract(`goldkredi_${message.author.id}`, miktar)
        db.add(`goldkredi_${kişi.id}`, miktar)
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **${miktar}** Miktarında kredinizi ${kişi} Adlı kişiye transfer ettim!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 

    }

    if(args[0] === "bilgi") {
        let kişi = message.guild.members.cache.get(member => args.length && message.mentions.users.size < 1 && member.user.username.toLowerCase().startsWith(args.join(" ").toLowerCase())) || client.users.cache.get(args[0]) || message.mentions.users.first() || message.author
        let kredi;
		if(db.fetch(`goldkredi_${kişi.id}`)) {
			kredi = `${db.fetch(`goldkredi_${kişi.id}`)} Kredi`
		} else {
			kredi = "Yok"
		}
        if(kişi.id === client.user.id) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Benim kredi bilgilerime bakamazsın!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }
		
   
		const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, kişi.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
		.setFooter(client.ayarlar.embedFooter, kişi.avatarURL({ dynamic: true }))
		.setDescription(`
        ${kişi} Adlı kişinin kredi bilgileri.
        `)
        .addField("Gold Kredi Miktarı:", `
        • | **${kredi}**
        `) 
        return message.channel.send(market) 	
		
		
    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "kredi",
    description: "Gold Kredi transfer eder/bilgilerine bakarsınız.",
    usage: "kredi yatır miktar/çek miktar/bilgi"
}