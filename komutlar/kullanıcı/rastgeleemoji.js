const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message) => {
  
    const DBL = require("dblapi.js");
    const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)
    if(!db.has(`üyelikk_${message.author.id}`) === "aktif") {
dbl.hasVoted(message.author.id).then(async voted => {
      if(voted === true) {
    if(!message.channel.nsfw === true) return message.channel.send("+18 Emojiler gelebilir bu yüzden bu komutu NSFW olan bir kanalda kullanın.")
    const emoji = client.emojis.cache.random()

let hareketlimi;
if(emoji.animated === true) {
    hareketlimi = "[**Evet!**](https://discord.gg/paypal)"
} else {
    hareketlimi = "[**Hayır!**](https://discord.gg/paypal)"
}

let channelsSize = await client.shard.fetchClientValues('emojis.cache.size')
  let channelsWhySize = channelsSize.reduce((acc, channelsCount) => acc + channelsCount, 0)

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.renk)
    .setDescription(`> Toplamda: **${channelsWhySize}** Adet emoji var!\n> Adı: [**${emoji.name}**](https://discord.gg/paypal)\n> İD: [**${emoji.id}**](https://discord.gg/paypal)\n> Hareketlimi: ${hareketlimi}\n> Bağlantı: [**Tıkla!**](${emoji.url})`)
    .setImage(emoji.url)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(embed)
      } else {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan DBL üzerinden oy vermen gerekli!\nOy verme bağlantısı: [Tıkla](https://top.gg/bot/${client.user.id})`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      message.channel.send(embed);
      }
    })
    } else {
if(!message.channel.nsfw === true) return message.channel.send("+18 Emojiler gelebilir bu yüzden bu komutu NSFW olan bir kanalda kullanın.")
    const emoji = client.emojis.cache.random()

let hareketlimi;
if(emoji.animated === true) {
    hareketlimi = "[**Evet!**](https://discord.gg/paypal)"
} else {
    hareketlimi = "[**Hayır!**](https://discord.gg/paypal)"
}

let channelsSize = await client.shard.fetchClientValues('emojis.cache.size')
  let channelsWhySize = channelsSize.reduce((acc, channelsCount) => acc + channelsCount, 0)

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
    .setColor(client.ayarlar.renk)
    .setDescription(`> Toplamda: **${channelsWhySize}** Adet emoji var!\n> Adı: [**${emoji.name}**](https://discord.gg/paypal)\n> İD: [**${emoji.id}**](https://discord.gg/paypal)\n> Hareketlimi: ${hareketlimi}\n> Bağlantı: [**Tıkla!**](${emoji.url})`)
    .setImage(emoji.url)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    return message.channel.send(embed)
    }
    
     
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["rastgele-emoji", "randomemoji", "random-emoji"]
}

exports.help = {
    name: "rastgeleemoji",
    description: "rastgele emoji atar",
    usage: "w!rastgeleemoji"
}