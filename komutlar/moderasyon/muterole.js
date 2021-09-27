const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args, prefix) => {
  let rol = message.mentions.roles.first()
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Yetersiz yetki! gereken yetki: `ROLLERİ_YÖNET`")
  let muteRole = await db.fetch(`muteRole_${message.guild.id}`)
  if(!args[0]){
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Hata!", `Bir değişken belirtmedin! **${prefix}mute-rol ayarla @rol** veya **${prefix}mute-rol sıfırla** Yazmalısın!`)
    message.channel.send(rol1)
  }
  if(args[0] == "sıfırla"){
 if(!muteRole){
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Hata!", `<@&${muteRole}> Adlı rol zaten ayarlı değil! ayarlamak için: ${prefix}mute-rol ayarla @rol`)
   return message.channel.send(rol1)
  }
       db.delete(`muteRole_${message.guild.id}`)
     const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)
    .addField("Başarılı!", `Başarılı Bir Şekilde Mute Rolü Sıfırlandı!`)
  return message.channel.send(rol1)
 
  }
  
  if(args[0] === "ayarla"){
  if(muteRole){//ne blm aq kafam karıştı al bunu bu 
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL)// mal hangi rol ayarlı onu gösteriyor
    .addField("Hata!", `Mute Rol Değeri Zaten <@&${muteRole}> Olarak Ayarlı!`)
    return message.channel.send(rol1)
  }
    db.set(`muteRole_${message.guild.id}`, rol.id)
    const rol1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setColor("RANDOM")// değiş
    .setThumbnail(client.user.avatarURL)
    .addField("Başarılı!", `${rol} Adlı rol mute rolü olarak ayarlandı! sıfırlamak için: ${prefix}mute-rol sıfırla`)
    return message.channel.send(rol1)
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["muterole", "mute-rol"]
}

exports.help = {
  name: "mute-role",
  description: "anti spam mute rolünü ayarlar.",
  usage: "${prefix}mute-role ayarla @rol sıfırla"
}