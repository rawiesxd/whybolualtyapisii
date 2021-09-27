const Discord = require("discord.js")
const db = require("quick.db")
exports.run = (client, message, args, member) => {
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Üyeleri at yetkin yok!")
  let kisi = message.mentions.users.filter(s => s.ID !== client.user).first()
  let rol = message.mentions.roles.first()

  if(!kisi) return message.channel.send("Atmak İstediğiniz Üyeyi Etiketleyiniz.")
  if(rol) return message.channel.send("Bir rolü atamam!")
  if(kisi.id === message.author.id) return message.channel.send("Kendini atamazsın!")
  if(kisi.id === client.user.id) return message.channel.send("Kendimi atamam!")
 
  
    if(!message.guild.member(kisi).kickable){
    const embed = new Discord.MessageEmbed()
    .setColor(client.ayarlar.renk)
    .setTitle("İşlem Başarısız.")
    .setDescription(`Yetkili Kişileri Sunucudan Atamam.`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
   return message.channel.send(embed)    
  }
  
  message.guild.member(kisi).kick();
  const kick = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.embedRenk)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
  .setDescription(`${kisi}, ${message.author} Tarafından Sunucudan Atıldı.`)
  message.channel.send(kick);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: "kick",
  description: "etiketlediğiniz kişiyi sunucudan atarsınız.",
  usage: "w!kick"
}