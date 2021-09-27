const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args, prefix) => {
    const DBL = require("dblapi.js");
    const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)
 
    dbl.hasVoted(message.author.id).then(voted => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için `YÖNETİCİ` olman gerekli!")
        const mesaj = args.slice(1).join(" ")
        if(voted === true) {
            if(!args[0]) {
                const embedd = new Discord.MessageEmbed()
               .setColor("BLUE")
               .setDescription(`Merhaba, Öncelikle otorol mesajı ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: ${prefix}otorolmesaj ayarla veya ${prefix}otorolmesaj sıfırla!`)
               .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
               return message.channel.send(embedd)
             } 
             
             if(args[0] === "ayarla") {
                   if(!mesaj) {
                      const embedd = new Discord.MessageEmbed()
                      .setColor("BLUE")
                      .setDescription(`Merhaba, Öncelikle otorol mesajı ayarlamak istiyorsan eğer bir mesaj belirtmelisin! örnek: ${prefix}otorolmesaj ayarla <mesaj>`)
                      .addField("Fonksiyonlar:", `> {kullanıcı} => **Gelen kullanıcıyı etiketler. (${message.author})**\n> {kullanıcı_adı} => **Kullanıcı adını gösterir. (${message.author.username})**\n> {sunucuadı} => **Sunucu adını gösterir. (${message.guild.name})**\n> {sunucuüyesayısı} => **Sunucuda bulunan üye sayısını gösterir. (${message.guild.memberCount})**\n> {roladı} => **Verilecek rolün adını yazar. (WhYBoLu)**`)
                      .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
                      return message.channel.send(embedd)
                   }
          
                   db.set(`otorolmesaj_${message.guild.id}`, mesaj)
                   const embedd = new Discord.MessageEmbed()
                  .setColor("BLUE")
                  .setDescription(`Merhaba, Başarılı bir şekilde otorol mesajını ayarladım!\n Ayarlanmış değer: **${mesaj}**`)
                  .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
                  return message.channel.send(embedd)
             }
             
             if(args[0] === "sıfırla") {
                 db.delete(`otorolmesaj_${message.guild.id}`)
                 const embedd = new Discord.MessageEmbed()
               .setColor("BLUE")
               .setDescription(`Merhaba, Başarılı bir şekilde otorol mesajı sıfırlandı!`)
               .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
               return message.channel.send(embedd)
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
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "otorolmesaj",
    description: "Otorol mesajını ayarlar/sıfırlarsınız.",
    usage: "otorolmesaj <ayarla mesaj/sıfırla>"
}