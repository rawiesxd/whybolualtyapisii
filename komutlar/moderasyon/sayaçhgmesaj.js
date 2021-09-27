const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args, prefix) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)

    dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için `YÖNETİCİ` olman gerekli!")
    const mesaj = args.slice(1).join(" ")
    const mesajj = db.fetch(`sayaçMHG_${message.guild.id}`)
    const sayaçhedef = db.fetch(`sayaçH_${message.guild.id}`)
    const kalanüye = message.guild.memberCount - sayaçhedef
 
    if(!args[0]) {
       const embedd = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Merhaba, Öncelikle sayaç mesajı ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: ${prefix}sayaçhgmesaj ayarla veya ${prefix}sayaçhgmesaj sıfırla!`)
      .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
      return message.channel.send(embedd)
    } 
    
    if(args[0] === "ayarla") {
     if(!mesaj) {
     const embedd = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Merhaba, Sayaç Mesajı ayarlamak istiyorsan eğer bir mesaj belirlemelisin! örnek: ${prefix}sayaçhgmesaj ayarla <mesaj>`)
      .addField("Fonksiyonlar:", `> {kullanıcı} => **Giden kullanıcıyı etiketler. (${message.author})**\n> {kullanıcı_adı} => **Kullanıcı adını gösterir. (${message.author.username})**\n> {sunucuadı} => **Sunucu adını gösterir. (${message.guild.name})**\n> {sunucuüyesayısı} => **Sunucuda bulunan üye sayısını gösterir. (${message.guild.memberCount})**\n> {kalanüye} => **Belirlenen hedefe kaç kişi kaldığını gösterir. (${kalanüye})**`)
      .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
      return message.channel.send(embedd)	
     }
      
     db.set(`sayaçMHG_${message.guild.id}`, mesaj)
     
    const embedd = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Merhaba, Başarılı bir şekilde sayaç hoş geldin mesajını ayarladım!\n Ayarlanmış değerler; Mesaj: ${mesaj}`)
      .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
      return message.channel.send(embedd)	
    }
    
    if(args[0] === "sıfırla") {
        if(!mesajj) {
            const embedd = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
      .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
      return message.channel.send(embedd)	
        }
        
        db.delete(`sayaçMHG_${message.guild.id}`)
        
        const embedd = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(`Başarılı bir şekilde **sayaç mesajı** sıfırlandı!`)
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
    name: "sayaçhgmesaj",
    description: "Sayaç Mesajını ayarlar/sıfırlarsınız.",
    usage: "sayaçhgmesaj <ayarla <mesaj>/sıfırla>"
}