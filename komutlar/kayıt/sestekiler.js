const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args, prefix) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Hata! Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine ihtiyacın var!")
    let yetkili = db.fetch(`kayıtyetkilirol_${message.guild.id}`)
    let rol = message.guild.roles.cache.get(yetkili)
    
    if(!yetkili) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Kayıt Yetkili Rolü Ayarlanmamış!
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }

    if(!message.guild.members.cache.filter(s => s.roles.cache.has(yetkili))) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        <@&${yetkili}> Rolüne ait birisi bulunamadı.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }
    const charCheck = (str, max = 1024) => (str.length > max) ? str.slice(0, max - 3) + "..." : str;
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    Bu sunucuda <@&${yetkili}> Rolüne ait **${message.guild.members.cache.filter(s => s.roles.cache.has(yetkili)).size}** Adet üye var!
    `)
    .addField("Seste Olan Yetkililer:", `
    ${charCheck(message.guild.members.cache.filter(s => s.roles.cache.has(yetkili) && s.voice.channel && !s.user.bot).map(s => s).join(", "))}
    `)
    .addField("Seste Olmayan Yetkililer:", `
    ${charCheck(message.guild.members.cache.filter(s => s.roles.cache.has(yetkili) && !s.voice.channel && !s.user.bot).map(s => s).join(", "))}
    `)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kayıt-yetkili-bilgi", "kayıtsesbilgi", "kayıt-ses-bilgi"]
}

exports.help = {
    name: "sestekiler",
    description: "Seste bulunan yetkilileri gösterir.",
    usage: "sestekiler"
}