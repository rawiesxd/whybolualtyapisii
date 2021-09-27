const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args, prefix) => {
	
	const duration = moment.duration(db.fetch(`goldsüre_${message.author.id}`) - Date.now()).format(" D [gün], H [saat], m [dakika], s [saniye]");
	  
    let üyelikdurum;
    if(db.fetch(`üyelikk_${message.author.id}`) === "aktif") {
        üyelikdurum = `Gold Üye! - Süre: ${duration || "0 gün, 0 saat, 0 dakika, 0 saniye"}`
    } else {
        üyelikdurum = "Normal Üye!"
    }
    
    const market = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Krediniz: \`${db.fetch(`goldkredi_${message.author.id}`) || 0} WhYBoLu Coini\`
    • | Üyelik Durumu: \`${üyelikdurum}\`
    • | İninal Barkodumuz: \`4092550479005\`
    `)
    .addField("Premium Paketler", `
    • | Paket: **Başlangıç** - Süre: **1 - 7 Gün**
	• | Paket: **Orta** - Süre: **7 - 14 Gün**
	• | Paket: **Üst** - Süre: **14 - 29 Gün**
    `, true)
    .addField("Satın Alma", `
    • | Komut: **${prefix}demir** - Fiyat: **5.000 Kredi**
	• | Komut: **${prefix}altın** - Fiyat: **15.000 Kredi**
	• | Komut: **${prefix}zümrüt** - Fiyat: **25.000 Kredi**
    `, true)
    .addField("Özellikler", `
    • | Özellik: **Pasif Mod** - Açıklama: **Pasif Mod Aktifken Saldırı alamazsınız.**
    `)
    .addField("Satın Alma", `
    • | Komut: **${prefix}pasifmod** - Fiyat: **30.000 Kredi**
    `, true)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(market)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["shop"]
}

exports.help = {
    name: "market",
    description: "marketten alışveriş yaparsınız.",
    usage: "market"
}