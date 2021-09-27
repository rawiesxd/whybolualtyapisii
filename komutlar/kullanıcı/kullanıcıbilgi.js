const Discord = require("discord.js")
const moment = require('moment');
require("moment-duration-format")
const db = require("quick.db")
exports.run = async (client, message, args) => {
  /* let kişi = message.mentions.kişis.first() || message.author
   let küfürsayi = db.fetch(`küfürsayi_${kişi.id}`)
  let bansayı = db.fetch(`bansayi_${kişi.id}`)
   var tarih = ''
            if(moment(kişi.createdAt).format('MM') === '01') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '02') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '03') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '04') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '05') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '06') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '07') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '08') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '09') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '10') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '11') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '12') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
			const member = message.guild.member(kişi);
			let x1, x2, x3, x4;
 if(kişi.displayAvatarURL({dynamic:true}) === kişi.displayAvatarURL({dynamic:true, format:"gif"})){
   x1=  `[**[GIF]**](${kişi.displayAvatarURL({format:"gif"})})`
 }else{
  x1= "~~**[GIF]**~~"
 }
  
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x2=  `[**[PNG]**](${kişi.displayAvatarURL({format:"png"})})`
 } else {
    x2= "~~**[PNG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x3=  `[**[JPG]**](${kişi.displayAvatarURL({format:"jpg"})})`
 } else {
    x3= "~~**[JPG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x4=  `[**[WEBP]**](${kişi.displayAvatarURL({format:"webp"})})`
 } else {
    x4= "~~**[WEBP]**~~"
 }
 
 let oynuyor;
if((kişi.presence.activities.length != 0) && (kişi.presence.activities[0].name == "Custom Status")) {
  oynuyor = `${kişi.presence.activities[0].state || `Sadece Emoji Bulunuyor !`}`;
} else if(kişi.presence.activities.length != 0) {
  oynuyor = kişi.presence.activities[0].name;
}else{
  oynuyor = "Herhangi Bir Oynuyoru Yok"
}
    const millisJoined = new Date().getTime() - member.joinedAt.getTime();
    const kişiJoined = moment.duration(millisJoined).format("Y [yıl], D [gün], H [saat], m [dakika], s [saniye]")

var durum = ''
  if (kişi.presence.status === "dnd") {
  var durum = 'Rahatsız Etmeyin'
  }
  if (kişi.presence.status === "offline") {
  var durum = 'Görünmez / Çevrimdışı'
  }
  if (kişi.presence.status === "idle") {
  var durum = 'Boşta'
  }
  if (kişi.presence.status === "online") {
  var durum = 'Aktif'
  }
  
  
   const embed = new Discord.MessageEmbed()
   .setColor(client.ayarlar.embedRenk)
   .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
   .addField("• Bilgiler;", `• Adı: **${kişi.kişiname}**\n• İD: **${kişi.id}**\n• Hesap Kurulum Tarihi: **${tarih}**\n• Bot mu?: ${kişi.bot ? `<:bot:764528739454681119> **Evet!**`  : "**Hayır!**"}`)
   .addField("• Rozetler;", kişi.flags.toArray().join('\n') ? kişi.flags.toArray().join('\n')
   .replace("HOUSE_BRAVERY", "<:bravery:733751308149981246> => **HypeSquad Bravery**")
   .replace("HOUSE_BRILLIANCE", "<:brilliance:733751511460479066> => **HypeSquad Brilliance**")
   .replace("HOUSE_BALANCE", "<:balance:733751992903532704> => **HypeSquad Balance**")
   .replace("EARLY_VERIFIED_DEVELOPER", "<:verified:723133328277897257> => **İlk Dönemde Doğrulanmış Bot Geliştiricisi**")
   .replace("VERIFIED_DEVELOPER", "<:verified:723133328277897257> => **Doğrulanmış Bot Geliştiricisi**")
   .replace("DISCORD_EMPLOYEE", "<:discordstaff:733755487048171601> => **Discord Çalışanı**")
   .replace("DISCORD_PARTNER", "<:discordpartner:733755844293951528> => **Partner**")
   .replace("HYPESQUAD_EVENTS", "<:hypesquad_etkinlikleri:733756159432982568> => **HypeSquad Etkinlikleri**")
   .replace("BUGHUNTER_LEVEL_1", "<:bughunterlevel1:733756652045598902> => **Bug Avcısı Level 1**")
   .replace("EARLY_SUPPORTER", "<:erkendnem:733756884129153079> => **Erken Dönem Destekcisi**")
   .replace("TEAM_kişi", "**Takım Üyesi**")
   .replace("SYSTEM", "**Sistem**")
   .replace("BUGHUNTER_LEVEL_2", "<:bughunterlevel2:733753982698258483> **Bug Avcısı Level 2**")
   .replace("VERIFIED_BOT", "<:verifiedbot:733753214897487963> **Doğrulanmış Bot**") : `**Yok**`)
   .addField("• Sayılarla Bilgiler", `• Küfür etme sayısı: **${db.fetch(`küfürsayi_${kişi.id}`) ? db.fetch(`küfürsayi_${kişi.id}`)  : '**Hiç Küfür Etmemiş.**'}**\n• Link atma sayısı: **${db.fetch(`linksayi_${kişi.id}`) ? db.fetch(`linksayi_${kişi.id}`)  : '**Hiç Link Atmamış.**'}**\n• Reklam yapma sayısı: **${db.fetch(`reklamsayi_${kişi.id}`) ? db.fetch(`reklamsayi_${kişi.id}`)  : '**Hiç Reklam Yapmamış.**'}**\n• Büyük harf kullanma sayısı: **${db.fetch(`capssayi_${kişi.id}`) ? db.fetch(`capssayi_${kişi.id}`)  : '**Hiç Büyük Harf Kullanmamış.**'}**\n• Spam yapma sayısı: **${db.fetch(`spamsayi_${kişi.id}`) ? db.fetch(`spamsayi_${kişi.id}`)  : '**Hiç Spam Yapmamış.**'}**\n• Banladığı kullanıcı sayısı: **${bansayı || 0}**`)
   .addField("• Diğer Bilgiler;", `• Avatar: ${x1} | ${x2} | ${x3} | ${x4}\n• Durum Yazısı: **${oynuyor}**\n• Sunucu Katılım Tarihi: **${kişiJoined}**\n• Durum: **${durum}**`)
  // .addField("• Sponsor:", `• Bize sponsor olan **Önem Bilişim**'e teşekkür ederiz! [Sunucu](https://discord.gg/FNnUg6z) • [Site](https://www.onembilisim.com/) • (Dikkat WhYBoLunun destek sunucusu burası değildir, lütfen gidip yetkililerden WhYBoLu hakkında yardım istemeyin! [Destek Sunucumuz](https://discord.gg/paypal))`)
   .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
   //.setThumbnail(client.kişi.avatarURL())
   return message.channel.send(embed)
   */

	const kişi = message.mentions.users.filter(s => s.ID !== client.user).first() || message.author
	
	var tarih = ''
            if(moment(kişi.createdAt).format('MM') === '01') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '02') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '03') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '04') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '05') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '06') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '07') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '08') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '09') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '10') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '11') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '12') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
			
			let x1, x2, x3, x4;
 if(kişi.displayAvatarURL({dynamic:true}) === kişi.displayAvatarURL({dynamic:true, format:"gif"})){
   x1=  `[**[GIF]**](${kişi.displayAvatarURL({format:"gif"})})`
 }else{
  x1= "~~**[GIF]**~~"
 }
  
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x2=  `[**[PNG]**](${kişi.displayAvatarURL({format:"png"})})`
 } else {
    x2= "~~**[PNG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x3=  `[**[JPG]**](${kişi.displayAvatarURL({format:"jpg"})})`
 } else {
    x3= "~~**[JPG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x4=  `[**[WEBP]**](${kişi.displayAvatarURL({format:"webp"})})`
 } else {
    x4= "~~**[WEBP]**~~"
 }
 
 let oynuyor;
if((kişi.presence.activities.length != 0) && (kişi.presence.activities[0].name == "Custom Status")) {
  oynuyor = `${kişi.presence.activities[0].state || `Sadece Emoji Bulunuyor !`}`;
} else if(kişi.presence.activities.length != 0) {
  oynuyor = kişi.presence.activities[0].name;
}else{
  oynuyor = "Herhangi Bir Oynuyoru Yok"
}
   
var durum = ''
  if (kişi.presence.status === "dnd") {
  var durum = 'Rahatsız Etmeyin <:dnd:784079022677688390>'
  }
  if (kişi.presence.status === "offline") {
  var durum = 'Çevrimdışı <:offline:784078540064686110>'
  }
  if (kişi.presence.status === "idle") {
  var durum = 'Boşta <:idle:784078784227704864>'
  }
  if (kişi.presence.status === "online") {
  var durum = 'Aktif <:online:713795317044084768>'
  }
			
	let platform;
	if(kişi.presence.clientStatus === "web") {
		platform = ":globe_with_meridians: Web Site"
	} else if(kişi.presence.clientStatus === "desktop") {
		platform = ":desktop: Bilgisayar"
	} else if(kişi.presence.clientStatus === "mobile") {
		platform = "<:mobil:784077471896698912> Mobil"
	}
	
	if(platform === undefined || platform === null) platform = "Bilinmiyor"
	
   const kullanıcıbilgi = new Discord.MessageEmbed()
   .setColor(client.ayarlar.embedRenk)
   .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
   .addField("Kullanıcı Bilgileri", `
   • | Adı: **${kişi.tag}**
   • | ID: **${kişi.id}**
   • | Bot mu: ${kişi.bot ? `**Evet**`  : "**Hayır**"}
   • | Hesap Kurulum Tarihi: **${tarih}**
   `, true)
   .addField("Rozet Bilgileri", kişi.flags.toArray().join('\n') ? kişi.flags.toArray().join('\n')
   .replace("HOUSE_BRAVERY", "• | <:bravery:733751308149981246> => **HypeSquad Bravery**")
   .replace("HOUSE_BRILLIANCE", "• | <:brilliance:733751511460479066> => **HypeSquad Brilliance**")
   .replace("HOUSE_BALANCE", "• | <:balance:733751992903532704> => **HypeSquad Balance**")
   .replace("EARLY_VERIFIED_DEVELOPER", "• | <:verified:723133328277897257> => **Erken Doğrulanmış Bot Geliştiricisi**")
   .replace("VERIFIED_DEVELOPER", "• | <:verified:723133328277897257> => **Doğrulanmış Bot Geliştiricisi**")
   .replace("DISCORD_EMPLOYEE", "• | <:discordstaff:733755487048171601> => **Discord Çalışanı**")
   .replace("DISCORD_PARTNER", "• | <:discordpartner:733755844293951528> => **Partner**")
   .replace("HYPESQUAD_EVENTS", "• | <:hypesquad_etkinlikleri:733756159432982568> => **HypeSquad Etkinlikleri**")
   .replace("BUGHUNTER_LEVEL_1", "• | <:bughunterlevel1:733756652045598902> => **Bug Avcısı Level 1**")
   .replace("EARLY_SUPPORTER", "• | <:erkendnem:733756884129153079> => **Erken Dönem Destekcisi**")
   .replace("TEAM_USER", "• | **Takım Üyesi**")
   .replace("SYSTEM", "• | **Sistem**")
   .replace("BUGHUNTER_LEVEL_2", "• | <:bughunterlevel2:733753982698258483> **Bug Avcısı Level 2**")
   .replace("VERIFIED_BOT", "• | <:verifiedbot:733753214897487963> **Doğrulanmış Bot**") : `**Yok**`, true)
   .addField("Diğer Bilgiler", `
   • | Avatar Bağlantısı: ${x1} - ${x2} - ${x3} - ${x4}
   • | Durum: **${durum}**
   • | Oynuyor: **${oynuyor}**
   • | Discorda Bağlandığı Platform: **${platform}**
   `)
   .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
   return message.channel.send(kullanıcıbilgi)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kullanıcı-bilgi"],
  permLevel: 0
}

exports.help = {
  name: "kullanıcıbilgi",
  description: "istatistik",
  usage: "istatistik"
}