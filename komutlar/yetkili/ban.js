const Discord = require("discord.js")
const db = require("quick.db")
exports.run = (client, message, args, member) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Üyeleri yasakla yetkin yok!")
  let kisi = message.mentions.users.filter(s => s.ID !== client.user).first()
  let rol = message.mentions.roles.first()

  const sebep = args.slice(1).join(' ');
  if(!kisi) return message.channel.send("Banlamak İstediğiniz Üyeyi Etiketleyiniz.")
  if(!sebep) return message.channel.send("Banlama Sebebinizi Yazmalısınız.")
  if(rol) return message.channel.send("Bir rolü banlayamam!")
  if(kisi.id === client.user.id) return message.channel.send("Kendimi banlayamam.")
  if(kisi.id === message.author.id) return message.channel.send("Kendini banlayamazsın!")
  
    if(!message.guild.member(kisi).bannable){
    const embed = new Discord.MessageEmbed()
    .setColor(client.ayarlar.renk)
    .setTitle("İşlem Başarısız.")
    .setDescription(`Yetkili Kişileri Banlayamam`)
    .setFooter(client.user.username, client.user.avatarURL())
    .setTimestamp()
   return message.channel.send(embed)    
  }
  
  db.add(`toplamban`, +1)
  message.guild.members.ban(kisi, { reason: sebep });
  const ban = new Discord.MessageEmbed()
  .setDescription(`${kisi}, ${message.author} Tarafından **${sebep}** Nedeniyle Sunucudan Yasaklandı.`)
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.embedRenk)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
  message.channel.send(ban);
   
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: "ban",
  description: "etiketlediğiniz kişiyi banlarsınız.",
  usage: "w!ban"
}