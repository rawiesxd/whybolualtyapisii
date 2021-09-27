const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async (client, message, args) => {
   const data = message.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`erkekkayıt_${b.id}_${message.guild.id}`) - db.fetch(`erkekkayıt_${a.id}_${message.guild.id}`)});
   const filter = data.filter(s => (db.fetch(`erkekkayıt_${s.id}_${message.guild.id}`)) > 0)
   const top10 = filter.splice(0, 10)
   const map = top10.map((item, index) => `**${index + 1}.** <@${item.id}> => **${db.fetch(`erkekkayıt_${item.id}_${message.guild.id}`) + db.fetch(`kızkayıt_${item.id}_${message.guild.id}`) || 0}** Toplam Kayıt (Erkek: **${db.fetch(`erkekkayıt_${item.id}_${message.guild.id}`) || 0}**)`).join("\n")

   const data2 = message.guild.members.cache.filter(u => !u.user.bot).array().sort((a, b) => { return db.fetch(`kızkayıt_${b.id}_${message.guild.id}`) - db.fetch(`kızkayıt_${a.id}_${message.guild.id}`)});
   const filter2 = data2.filter(s => (db.fetch(`kızkayıt_${s.id}_${message.guild.id}`)) > 0)
   const top11 = filter2.splice(0, 10)
   const map2 = top11.map((item, index) => `**${index + 1}.** <@${item.id}> => **${db.fetch(`erkekkayıt_${item.id}_${message.guild.id}`) + db.fetch(`kızkayıt_${item.id}_${message.guild.id}`) || 0}** Toplam Kayıt (Kız: **${db.fetch(`kızkayıt_${item.id}_${message.guild.id}`) || 0}**)`).join("\n")


   if(!map || !map2) {
      var yok = new Discord.MessageEmbed()
          .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
          .setColor(client.ayarlar.embedRenk)
          .setDescription(`Sunucuda kimse kayıt etmemiş, bu yüzden sıralamayı gösteremedim!`)
          .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
          return message.channel.send(yok);
  } 

    var embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba ${message.author}, Bu Sunucunun Kayıt Sıralaması Aşağıda Gözükecektir.`)
        .addField("Erkek Sıralama", `${map}`)
        .addField("Kız Sıralama", `${map2}`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))

    message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kayıtsıralama", "kayıt-sıralama"]
};
exports.help = {
  name: 'sıralama',
  description: 'Kayıt sıralamasını gösterir.',
  usage: 'w!sıralmaa'
};
