const Discord = require("discord.js")

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Yetersiz yetki!")
  if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Bu komutu çalıştırmam için `MESAJLARI YÖNET` yetkisine ihtiyacım var!")
	  
  
  /*let miktar = args[0];
    if(!miktar || isNaN(miktar)) return message.channel.send("Lütfen Silmek İstediğiniz Miktar Mesajı Belirtiniz.")
    if(miktar > 100) return message.channel.send(`Lütfen 1-100 Arası Bir Değer Belirtin.`)
   message.channel.bulkDelete(miktar)
 message.channel.send(`<a:onaylandi:698113364026720267> Başarılı Bir Şekilde **${miktar}** Mesaj Silindi.`).then(msg => {msg.delete({ timeout: 5000 })}).catch(err => { 
   message.channel.send("Discord APİ 14 günden önceki mesajları silmeme izin vermiyor!")})*/
   let sayı = args[0]
   if(!sayı || isNaN(sayı)) {
	const embed = new Discord.MessageEmbed()
	.setColor(client.ayarlar.embedRenk)
	.setAuthor(`WhYBoLu Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`Eğer mesajları silmemi istiyorsan lütfen silinicek mesaj miktarını belirt!`)
	.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
	return message.channel.send(embed)
   }
   
   if(sayı > 100) {
	  const embed = new Discord.MessageEmbed()
	.setColor(client.ayarlar.embedRenk)
	.setAuthor(`WhYBoLu Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`Üzgünüm ancak Discord kurallarına göre 100'den fazla mesaj silemem!`)
	.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
	return message.channel.send(embed) 
   }
   
   message.channel.bulkDelete(sayı, true, { limit: sayı })
   const embed = new Discord.MessageEmbed()
	.setColor(client.ayarlar.embedRenk)
	.setAuthor(`WhYBoLu Bot | Sil Komutu`, message.author.avatarURL({ dynamic: true }))
	.setDescription(`Başarılı bir şekilde **${sayı}** Adet mesaj sildim!`)
	.setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
	return message.channel.send(embed).then(sa => { sa.delete({ timeout: 5000 }) })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"]
}

exports.help = {
  name: "temizle",
  description: "sohbeti temizlersiniz.",
  usage: "w!temizle <miktar>"
}