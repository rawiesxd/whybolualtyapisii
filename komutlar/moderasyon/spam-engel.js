const Discord = require('discord.js');//lo nabıyon boş boş .D
const fs = require('fs');
const db = require('quick.db');

 exports.run = async(client, message, args) => {
 let spam = await db.fetch(`spamEngel_${message.guild.id}`)
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yetersiz yetki! gereken yetki: `YÖNETİCİ`")
let muteRole = await db.fetch(`muteRole_${message.guild.id}`)
   if(!args[0]) return message.channel.send("aç yada kapat yazmalısın!")
   
  if(args[0] === "aç"){
        if(!muteRole){
  const embed1 = new Discord.MessageEmbed()
    .setTitle("WhYBoLu Anti Spam Sistemi")
    .setDescription("Anti Spam Sistemini Açmak İçin Mute Rolünü Ayarlamanız Gerekli!")
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL())
  return message.channel.send(embed1)
   }
    if(spam){
      const embed3 = new Discord.MessageEmbed()
.setTitle("WhYBoLu Anti Spam Sistemi")
.setDescription("Anti Spam Sistemi Zaten Aktif!")
.setColor("RANDOM")
.setFooter(client.user.username, client.user.avatarURL())
return message.channel.send(embed3)
    }
      

    db.set(`spamEngel_${message.guild.id}`, "açık")
    const embed1 = new Discord.MessageEmbed()
.setTitle("WhYBoLu Anti Spam Sistemi")
.setDescription("Anti Spam Sistemi Başarıyla Açıldı!")
.setColor("RANDOM")
.setFooter(client.user.username, client.user.avatarURL())
return message.channel.send(embed1)
      
  }
   
     if(args[0] === "kapat"){
        if(!spam){
      const embed3 = new Discord.MessageEmbed()
.setTitle("WhYBoLu Anti Spam Sistemi")
.setDescription("Anti Spam Sistemi Zaten Kapalı!")
.setColor("RANDOM")
.setFooter(client.user.username, client.user.avatarURL())
return message.channel.send(embed3)
    }


    
    db.delete(`spamEngel_${message.guild.id}`)
    const embed = new Discord.MessageEmbed()
.setTitle("WhYBoLu Anti Spam Sistemi")
.setDescription("Anti Spam Sistemi Başarıyla Kapatıldı!")
.setColor("RANDOM")
.setFooter(client.user.username, client.user.avatarURL())
return message.channel.send(embed)
  }
};

       
         
  


exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["spamengel", "antispam", "anti-spam"],
 permLevel: 0
};

exports.help = {
 name: 'spam-engel',
 description: 'anti-spam-ayarla',
 usage: 'anti'
};