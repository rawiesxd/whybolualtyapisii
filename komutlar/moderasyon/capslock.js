const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanmak için gerekli yetkin yok! gereken yetki: `YÖNETİCİ`")
  if(!args[0]){
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! Lütfen bir değer belirt! **${prefix}capslock aç** veya **${prefix}capslock kapat**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
    }
  
  
  if(args[0] == "aç"){
    if(db.has(`capslock_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! capslock engel sistemi zaten aktif! kapatmak için: ${prefix}capslock kapat`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    
      db.set(`capslock_${message.guild.id}`, "aktif")
      
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde capslock engel sistemi **Aktifleştirildi!**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
  }
  
  if(args[0] == "kapat"){
    if(!db.has(`capslock_${message.guild.id}`) === "aktif"){
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Hata! capslock engel sistemi zaten kapalı! açmak için: ${prefix}capslock aç`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    }
    db.delete(`capslock_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Başarılı! Başarılı bir şekilde capslock engel sistemi **Kapatıldı!**`)
      .setColor(client.ayarlar.embedRenk)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);    
  }
  
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["capslock-engel", "büyükharf", "büyük-harf", "büyükharfengel", "büyük-harf-engel"],
  permLevel: 0
}

exports.help = {
  name: "capslock",
  description: "capslock filtresi",
  usage: "${prefix}capslock <aç/kapat>"
}