const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args, prefix) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yetersiz yetki! gereken yetki: `YÖNETİCİ`")
  let sınır = args[1]
  let muteRole = await db.fetch(`bansınır1_${message.guild.id}`)
    let kicksınır = await db.fetch(`kicksınır1_${message.guild.id}`)


  if(!args[0]){
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Hata!", `Bir değişken belirtmedin! **${prefix}ban-sınır ayarla sayı** veya **${prefix}ban-sınır sıfırla** Yazmalısın!`)
    message.channel.send(rol1)
  }
  if(args[0] == "sıfırla"){
 if(!muteRole){
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Hata!", `Ban sınır zaten ayarlı değil! ayarlamak için: **${prefix}ban-sınır ayarla sayı**`)
   return message.channel.send(rol1)
  }
       db.delete(`bansınır1_${message.guild.id}`)
     const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Başarılı!", `Başarılı Bir Şekilde Ban Sınırı Sıfırlandı!`)
  return message.channel.send(rol1)
 
  }
  
  if(args[0] === "ayarla"){
  if(muteRole){//ne blm aq kafam karıştı al bunu bu 
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)// mal hangi rol ayarlı onu gösteriyor
    .addField("Hata!", `Ban sınırı zaten **${muteRole}** olarak ayarlı!`)
    return message.channel.send(rol1)
  }
    db.set(`bansınır1_${message.guild.id}`, sınır)
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")// değiş
    .setThumbnail(client.user.avatarURL)
    .addField("Başarılı!", `Ban sınırı **${sınır}** olarak ayarlandı! sıfırlamak için: **${prefix}ban-sınır sıfırla**`)
    return message.channel.send(rol1)
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bansınır"]
}

exports.help = {
  name: "ban-sınır",
  description: "anti spam ban sınırını ayarlar.",
  usage: "${prefix}ban-sınır ayarla sınır sıfırla"
}