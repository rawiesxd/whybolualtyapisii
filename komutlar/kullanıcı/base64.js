const Discord = require("discord.js")

exports.run = async(client, message, args, prefix) => {
    if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`${message.author} Lütfen bir değer belirtin!\nÖrnek: \`${prefix}base64 <çevir yazı/çöz yazı>\``)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)
    }

    let yazı = args.slice(1).join(" ")
    if(!yazı) return message.channel.send("Lütfen `base64` koduna çevirilecek kodu giriniz.")
    if(yazı.length >= 1200) return message.channel.send("Çevirilecek kod `1200` karakterden fazla karakter içermemelidir.")
	if(yazı === client.user.id) return;

    if(args[0] === "çevir") {
        const converted = base64(yazı, "encode");
		if (!converted) return message.channel.send('Bu kod bir `base64` kodu değil.');
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
        const converted = base64(yazı, "decode");
		if (!converted) return message.channel.send('Bu kod bir `base64` kodu değil.');
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

function base64(text, mode = 'encode') {
    if (mode === 'encode') return Buffer.from(text).toString('base64');
    if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
    throw new TypeError(`${mode} adlı kod \`base64\` desteklemiyor.`);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "base64",
    description: "belirtilen kodu base64 moduna çevirir/düzeltirsiniz.",
    usage: "base64 <çevir kod/çöz kod>"
}