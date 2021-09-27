const Discord = require("discord.js");
const db = require("quick.db") 
exports.run = async (client, message, args) => {  
   const data = client.users.cache.filter(sa => !sa.bot).array().sort((a, b) => { return db.fetch(`goldkredi_${b.id}`) - db.fetch(`goldkredi_${a.id}`)});
   const filter = data.filter((a, b) => (db.fetch(`goldkredi_${b.id}`) + db.fetch(`goldkredi_${a.id}`)) > 0)
   const top10 = filter.splice(0, 10)

   const map = top10.map((item, index) => `**${index + 1}.** <@${item.id}> (${item.tag}) => **${db.fetch(`goldkredi_${item.id}`) || 0}** Kredi`).join("\n")

 if(!map) {
      var yok = new Discord.MessageEmbed()
          .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
          .setColor(client.ayarlar.embedRenk)
          .setDescription(`Üyeler arasından Gold Kredisi olan birini bulamadım!`)
          .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
          return message.channel.send(yok);
  }
 
    var embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba ${message.author}, Kredi'si bulunan kişiler aşağıda gözükecketir.`)
        .addField("Kredi Sıralaması", `${map}`)
        .setFooter(`${client.ayarlar.embedFooter}`, message.author.avatarURL({dynamic:true}))
    message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};
exports.help = {
  name: 'kredisıralama',
  description: 'Kredi sıralamasını gösterir',
  usage: 'w!kredisıralama'
};
