const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args) => {

    const member = message.mentions.users.filter(s => s.ID !== client.user).first() || message.guild.members.cache.get(args[0]) || message.author 
   /* 
    if(!member) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Eğer bir kişinin uyarılarına bakmak istiyorsan o kişiyi etiketlemen lazım!`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }
    let uyarılar = db.fetch(`uyarı_${member.id}`)

    if(!uyarılar) return message.channel.send("Bu kişinin bir uyarısı yok!")
    const warnEmbed = new Discord.MessageEmbed()
				.setAuthor(`${member.username} Kullanıcısının toplam ${uyarılar.length} uyarısı var!`, member.avatarURL({ dynamic: true }))
				.setColor(client.ayarlar.embedRenk)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))

    uyarılar.forEach((a, i) => { 
        const moderator = message.guild.members.cache.get(a.moderator);
        warnEmbed.addField(`Uyarılar: ${i + 1}`, `> Moderator: **${moderator ? moderator.user.tag : 'Bilinmiyor'}**\n> Sebep: **${a.sebep}**\n> İD: **${a.kullanıcı}**`, true);
    })
    return message.channel.send(warnEmbed);

    */

   var data = db.get(`uyarı_${member.id}_${message.guild.id}`)

   if(!db.has(`uyarı_${member.id}_${message.guild.id}`) === true) {
       var yok = new Discord.MessageEmbed()
           .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
           .setColor(client.ayarlar.embedRenk)
           .setDescription(`${member} Adlı kişinin hiç bir uyarısı yok!`)
           .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
           return message.channel.send(yok);
   }

   var list = Object.keys(data).map(_data => {
       return {
           id: (data[_data].kullanıcı),
           uyarısebep: (data[_data].sebep),
           moderator: (data[_data].moderator),
           uyarıid: (data[_data].uyarısayı)
       };
   })

   var embed = new Discord.MessageEmbed()
       .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
       .setColor(client.ayarlar.embedRenk)
       .setDescription(`
   ${member} Adlı kişinin toplamda **${data.length}** Adet uyarısı var!

   ${list.splice(0, 10).map((item, index) => `**${index + 1}.** <@${item.id}> => **${item.uyarısebep}** [Moderator: <@${item.moderator}> (**${item.moderator}**) - Uyarı İD: **${item.uyarıid}**]`).join("\n")}
   `)
       .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))

   message.channel.send(embed);



}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyarıliste"]
}

exports.help = {
    name: "warnlist",
    description: "uyarı listesini gösterir.",
    usage: "m-warnlist @kişi",
    kategori: "Yetkili"
}