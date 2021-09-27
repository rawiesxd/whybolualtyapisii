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
        Değerler: \`${prefix}banka <yatır miktar/çek miktar/bilgi/transfer @kişi miktar>\`
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 
    }

    if(args[0] === "yatır") {
        let miktar = args[1]
        let linkler = db.fetch(`goldkredi_${message.author.id}`)

        if(!miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen yatırılacak miktarı belirtin.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(!db.fetch(`goldkredi_${message.author.id}`)) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Hesabınızda kredi yok.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(linkler < miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            **${miktar}** Adet krediniz yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }
        db.add(`banka_${message.author.id}`, miktar)
		db.push(`bankalog_${message.author.id}`, { log: `[Yatırma] - **${miktar}** Miktarında Kredi Yatırma`, zaman: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
        db.subtract(`goldkredi_${message.author.id}`, miktar)
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **${miktar}** Miktarında kredinizi bankaya yatırdım!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(market) 
    }

    if(args[0] === "çek") {
        let miktar = args[1]
        let linkler = db.fetch(`goldkredi_${message.author.id}`)

        if(!miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Lütfen çekilecek miktarı belirtin.
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(!db.fetch(`banka_${message.author.id}`)) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Bankanızda kredi yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(db.fetch(`banka_${message.author.id}`) < miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Bankanızda **${miktar}** Miktarında kredi yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        db.subtract(`banka_${message.author.id}`, miktar)
		db.push(`bankalog_${message.author.id}`, { log: `[Çekme] - **${miktar}** Miktarında Kredi Çekme`, zaman: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
        db.add(`goldkredi_${message.author.id}`, miktar)
        const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Başarılı bir şekilde **${miktar}** Miktarında kredinizi bankadan çektim!
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

        if(!db.fetch(`banka_${message.author.id}`)) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Bankanızda kredi yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        if(db.fetch(`banka_${message.author.id}`) < miktar) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Bankanızda **${miktar}** Miktarında kredi yok!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }

        db.subtract(`banka_${message.author.id}`, miktar)
        db.add(`banka_${kişi.id}`, miktar)
        db.push(`bankalog_${message.author.id}`, { log: `[Transfer] - **${miktar}** Miktarında Kredi Gönderimi`, zaman: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
        db.push(`bankalog_${kişi.id}`, { log: `[Geldi] - **${miktar}** Miktarında Kredi Geldi`, zaman: moment(Date.now()).format('DD/MM/YYYY HH:mm') })
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
		if(db.fetch(`banka_${kişi.id}`)) {
			kredi = `${db.fetch(`banka_${kişi.id}`)} Kredi`
		} else {
			kredi = "Yok"
		}
        if(kişi.id === client.user.id) {
            const market = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Benim banka bilgilerime bakamazsın!
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(market) 
        }
		 
		if(db.has(`bankalog_${kişi.id}`) === true) {
		var data = db.get(`bankalog_${kişi.id}`)
		var list = Object.keys(data).map(_data => {
       return {
           id: (data[_data].log),
           zaman: (data[_data].zaman),
		};
	})
   
		const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, kişi.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
		.setFooter(client.ayarlar.embedFooter, kişi.avatarURL({ dynamic: true }))
		.setDescription(`
        ${kişi} Adlı kişinin banka bilgileri.
        `)
        .addField("Bankanızda Bulunan Kredi Miktarı:", `
        • | **${kredi}**
        `)
        if(db.has(`kredikartı_${kişi.id}`) === true) {
            var dataa = db.get(`kredikartı_${kişi.id}`)
		var list2 = Object.keys(dataa).map(_data => {
       return {
           id: (dataa[_data].numara),
           zaman: (dataa[_data].zaman),
           para: (dataa[_data].para)
		};
	})
        market.addField("WhYBoLu Kartı Bilgileri:", `
        ${list2.splice(0, 5).map((item, index) => `**${index + 1} - ** ${item.id} => [Zaman: **${item.zaman}** - Para: **${item.para}**]`).join("\n")}
        `)
        } else {
        market.addField("WhYBoLu Kartı Bilgileri:", `
        • | **Herhangi bir kredi kartı yok.**
        `)
        }
		market.addField("İşlemler:", list.splice(0, 10).map((item, index) => `**${index + 1} - ** ${item.id} => [Zaman: **${item.zaman}**]`).join("\n"))
        return message.channel.send(market) 	
		} else {
			const market = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, kişi.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
		.setFooter(client.ayarlar.embedFooter, kişi.avatarURL({ dynamic: true }))
		.setDescription(`
        ${kişi} Adlı kişinin banka bilgileri.
        `)
        .addField("Bankanızda Bulunan Kredi Miktarı:", `
        • | **${kredi}**
        `)
		.addField("WhYBoLu Kartı Bilgileri:", `
		• | **Yok**
		`)
		.addField("İşlemler:", `**Herhangi bir işlem yok.**`)
        return message.channel.send(market) 
		}
		
    }
    
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "banka",
    description: "bankaya para yatırır/çekersiniz",
    usage: "banka yatır miktar/çek miktar/bilgi"
}