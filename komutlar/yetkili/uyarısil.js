const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yönetici yetkin yok!")
    const member = message.mentions.users.filter(s => s.ID !== client.user).first() || message.guild.members.cache.get(args[0])
    const id = args[1]
	if(!id) return message.channel.send("Bir id belirt!")
    if(!member) return message.channel.send("Bir kullanıcı etiketle!")
    var data = db.get(`uyarı_${member.id}_${message.guild.id}`)

   if(!db.has(`uyarı_${member.id}_${message.guild.id}`) === true) {
       var yok = new Discord.MessageEmbed()
           .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
           .setColor(client.ayarlar.embedRenk)
           .setDescription(`${member} Adlı kişinin hiç bir uyarısı yok!`)
           .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
           return message.channel.send(yok);
   }

   
   if(data.length === 1) {
       db.delete(`uyarı_${member.id}_${message.guild.id}`)
    var yok = new Discord.MessageEmbed()
           .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
           .setColor(client.ayarlar.embedRenk)
           .setDescription(`Başarılı bir şekilde ${member} adlı kişinin, **${id}** İD'li uyarısını sildim!`)
           .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
           return message.channel.send(yok);
   } else {
    db.set(`uyarı_${member.id}_${message.guild.id}`, data.filter(s => s.uyarısayı !== id))
    var yok = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`Başarılı bir şekilde ${member} adlı kişinin, **${id}** İD'li uyarısını sildim!`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
            return message.channel.send(yok);
   }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyarı-sil"]
}

exports.help = {
    name: "uyarısil",
    description: "uyarı listesini gösterir.",
    usage: "w!uyarısil @kişi id"
}