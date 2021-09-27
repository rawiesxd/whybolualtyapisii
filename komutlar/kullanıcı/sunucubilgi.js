const Discord = require("discord.js")
const db = require("quick.db")
const moment = require('moment');
require("moment-duration-format")
exports.run =  (client, message, args) => {
  
  try {

	/*  const millisJoined = new Date().getTime() - message.guild.owner.user.createdAt
    const hesapkurulum = moment.duration(millisJoined).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
	
	const millisJoined2 = new Date().getTime() - message.guild.createdAt
    const sunucukurulum = moment.duration(millisJoined2).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
    const embed = new Discord.MessageEmbed()
    .setColor(client.ayarlar.embedRenk)
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .addField("●▬▬▬▬Kurucu Bilgileri▬▬▬▬▬●", `• Adı: **${message.guild.owner.user.tag}**\n• Etiketi: <@${message.guild.ownerID}>\n• İD: **${message.guild.ownerID}**\n• Hesap Kurulum Tarihi: **${hesapkurulum}**`)
    .addField("●▬▬▬▬Sunucu Bilgileri▬▬▬▬▬●", `• Adı: **${message.guild.name}**\n• Bölgesi: **${message.guild.region}**\n• Üye Sayısı: **${message.guild.memberCount}**\n• Kanal Sayısı: **${message.guild.channels.cache.size}**\n• Kurulum Tarihi: **${sunucukurulum}**`)
    .addField("●▬▬▬▬Bilgilendirme▬▬▬▬▬●", `• Bu Sunucuda,\n• Küfür engel; ${db.has(`küfürE_${message.guild.id}`, "aktif") ? `**Açık!**` : `**Kapalı!**`}\n• Link engel; ${db.has(`linkK_${message.guild.id}`, "aktif") ? `**Açık!**` : `**Kapalı!**`}\n• Reklam engel; ${db.has(`reklamK_${message.guild.id}`, "aktif") ? `**Açık!**` : `**Kapalı!**`}\n• Capslock engel; ${db.has(`capslock_${message.guild.id}`, 'acik') ? `**Açık!**` : `**Kapalı!**`}\n• Anti Spam; ${db.has(`spamEngel_${message.guild.id}`, "açık") ? `**Açık!**` : `**Kapalı!**`}`)
    .addField("●▬▬▬▬Sunucu İstatistik▬▬▬▬▬●", `• Son 1 Saatte Giren Üyeler => **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 3600000).size}**\n• Son 1 Günde Giren Üyeler => **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 86400000).size}**\n• Son 1 Haftada Giren Üyeler => **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 604800000).size}**\n• Son 1 Ayda Giren Üyeler => **${message.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 2629800000).size}**`)
    .addField("• Sponsor:", `• Bize sponsor olan **Önem Bilişim**'e teşekkür ederiz! [Sunucu](https://discord.gg/FNnUg6z) • [Site](https://www.onembilisim.com/) • (Dikkat WhYBoLunun destek sunucusu burası değildir, lütfen gidip yetkililerden WhYBoLu hakkında yardım istemeyin! [Destek Sunucumuz](https://discord.gg/paypal))`)
	  .setThumbnail(message.guild.iconURL({ dynamic: true }))
   //.setTimestamp()
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(embed).catch(err => console.log(err))
    */

   const millisJoined2 = new Date().getTime() - message.guild.createdAt
   const sunucukurulum = moment.duration(millisJoined2).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")
          const sunucubilgi = new Discord.MessageEmbed()
   .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
   .setColor(client.ayarlar.embedRenk)//<a:rol:777525943345872928> | 
   .addField(`<a:kullanici:757255074388115506> | Sunucu Bilgileri`, `> • | Adı: **${message.guild.name}**\n> • | İD: **${message.guild.id}**\n> • | Kurulum: **${sunucukurulum} Önce!**\n> • | Sahibi: ${message.guild.owner}`, true)
   .addField(`<:kanal:777520494995701791> | Kanal Bilgileri`, `> • | Sesli Kanal Sayısı: **${message.guild.channels.cache.filter(x => x.type === "voice").size}**\n> • | Normal Kanal Sayısı: **${message.guild.channels.cache.filter(x => x.type === "text").size}**\n> • | Duyuru Kanal Sayısı: **${message.guild.channels.cache.filter(x => x.type === "news").size}**`, true)
   .addField(`<:kullanici:751443872650887188> | Kullanıcı Bilgileri`, `> • | Aktif Üye Sayısı: **${message.guild.members.cache.filter(x => x.user.presence === "online").size}**\n> • | Kapalı Üye Sayısı: **${message.guild.members.cache.filter(x => x.user.presence === "offline").size}**\n> • | Boşta Üye Sayısı: **${message.guild.members.cache.filter(x => x.user.presence === "idle").size}**\n> • | Rahatsız Etmeyin Üye Sayısı: **${message.guild.members.cache.filter(x => x.user.presence === "dnd").size}**\n> • | Toplam Üye Sayısı: **${message.guild.memberCount}**`)
   .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
   return message.channel.send(sunucubilgi)
  } catch (error) {
    console.log(error)
    return message.channel.send(`
    Selam sayın **${message.author.tag}**,
    ${exports.help.name} Adlı komutu çalıştırırken bir hata çıktı! (lütfen bu hatayı yetkililere bildirin!)
    Hata: \`${error}\`
    Destek Sunucumuz: https://discord.gg/paypal
    `)
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true, 
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: "sunucubilgi",
  description: "sunucu hakkında bilgiler verir.",
  usage: "w!sunucubilgi"
}