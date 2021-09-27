const Discord = require("discord.js")

exports.run = async(client, message, args, prefix) => {
    if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`${message.author} Lütfen bir değer belirtin!\nÖrnek: \`${prefix}binary <çevir yazı/çöz yazı>\``)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)
    }

    let yazı = args.slice(1).join(" ")
    if(!yazı) return message.channel.send("Lütfen `binary` koduna çevirilecek kodu giriniz.")
    if(yazı.length >= 1200) return message.channel.send("Çevirilecek kod `1200` karakterden fazla karakter içermemelidir.")

    if(args[0] === "çevir") {
        const converted = binary(yazı);
		if (!converted) return message.channel.send('Bu kod bir `binary` kodu değil.');
		const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`${message.author} Başarılı bir şekilde belirttiğiniz kod çevirildi.`)
    .addField("Kod:", `
    ${yazı}
    `)
    .addField("Çevrilmiş Kod:", `
    ${converted}
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)
    } else if(args[0] === "çöz") {
        const converted = unbinary(yazı);
		if (!converted) return message.channel.send('Bu kod bir `binary` kodu değil.');
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`${message.author} Başarılı bir şekilde belirttiğiniz kod çözüldü.`)
    .addField("Kod:", `
    ${yazı}
    `)
    .addField("Çözülmüş Kod:", `
    ${converted}
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)
    }
}

function binary(text) {
    return text.split('').map(str => {
        const converted = str.charCodeAt(0).toString(2);
        return converted.padStart(8, '0');
    }).join(' ');
}

function unbinary(text) {
    return text.split(' ').map(str => String.fromCharCode(Number.parseInt(str, 2))).join('');
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "binary",
    description: "belirtilen kodu binary moduna çevirir/düzeltirsiniz.",
    usage: "binary <çevir kod/çöz kod>"
}