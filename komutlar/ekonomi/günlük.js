const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const moment = require("moment")
require("moment-duration-format")

exports.run = async(client, message, args, prefix) => {
    
  const DBL = require("dblapi.js");
  const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)

  dbl.hasVoted(message.author.id).then(voted => {
    if(voted === true) {
      let amount = Math.floor(Math.random() * 5000)
    
      if(db.fetch(`günlükSüre_${message.author.id}`) > Date.now()) {
              let timeout = (db.fetch(`günlükSüre_${message.author.id}`) - Date.now());
              const embed = new Discord.MessageEmbed()
             .setColor("BLUE")
             .setAuthor("Lütfen Bekle!", message.author.avatarURL({dynamic: true}))
             .setDescription(`
             Hata!
             Üzgünüm ancak günlük ödülünüzü zaten almışsın! \`${moment.duration(timeout).format("H [saat], m [dakika], s [saniye]")}\` Boyunca beklemelisin
             `)
              .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
             .setTimestamp()
            return message.channel.send(embed).then((msg) => { msg.delete({timeout: 5000})})
          } else {
              db.set(`günlükSüre_${message.author.id}`, (Date.now() + 86400000))
              setTimeout(() => {
                db.delete(`günlükSüre_${message.author.id}`)
              }, 86400000)
  
          db.add(`goldkredi_${message.author.id}`, amount)
          const market = new Discord.MessageEmbed()
          .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
          .setColor(client.ayarlar.embedRenk)
          .setDescription(`
          Başarılı!
          Başarılı bir şekilde günlük ödülünüz olan **${amount}** Miktarında kredinizi aldınız!
          `)
          .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
          return message.channel.send(market) 
          }
    } else {
      const embed = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setColor(client.ayarlar.embedRenk)
      .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan DBL üzerinden oy vermen gerekli!\nOy verme bağlantısı: [Tıkla](https://top.gg/bot/${client.user.id})`)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(embed);
    }
  })

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "günlük",
    description: "günlük ödülünüzü alırsınız.",
    usage: "günlük"
}