const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için gerekli yetkin yok! gereken yetki: `YÖNETİCİ`")
  if(!args[0]){
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! Lütfen bir değer belirt! **${prefix}link aç** veya **${prefix}link kapat**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
    }
  
  
  if(args[0] == "aç"){
    if(db.has(`linkK_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! link engel sistemi zaten aktif! kapatmak için: ${prefix}link kapat`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    
      db.set(`linkK_${message.guild.id}`, "aktif")
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde link engel sistemi **Aktifleştirildi!**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
  }
  
  if(args[0] == "kapat"){
    if(!db.has(`linkK_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! link engel sistemi zaten kapalı! açmak için: ${prefix}link aç`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    db.delete(`linkK_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde link engel sistemi **Kapatıldı!**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
  }
  
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: "link",
  description: "link filtresi",
  usage: "${prefix}link <aç/kapat>"
}