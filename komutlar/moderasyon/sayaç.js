const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async (client, message, args, prefix) => {
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Bu komutu kullanabilmek için `YÖNETİCİ` olman gerekli!")
   let kanal = message.mentions.channels.first() 
   let hedef = args[2]
   let kalan = args[2] - message.guild.memberCount
   const kanall = await db.fetch(`sayaçK_${message.guild.id}`)
   const hedeff = await db.fetch(`sayaçH_${message.guild.id}`)

   if(!args[0]) {
      const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Merhaba, Öncelikle sayaç ayarlamak istiyorsan eğer bir değer belirtmelisin! örnek: ${prefix}sayaç ayarla #kanal <hedef> veya ${prefix}sayaç sıfırla!`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)
   } 
   
   if(args[0] === "ayarla") {
	if(!hedef) {
	const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Merhaba, Sayaç ayarlamak istiyorsan eğer bir hedef belirlemelisin! örnek: ${prefix}sayaç ayarla #kanal <hedef>`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)	
	}
	if(!kanal) {
		const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Merhaba, Sayaç ayarlamak istiyorsan eğer bir kanal etiketlemelisin! örnek: ${prefix}sayaç ayarla #kanal <hedef>`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)	
	}

	db.set(`sayaçK_${message.guild.id}`, kanal.id) 
	db.set(`sayaçH_${message.guild.id}`, hedef)
   const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Merhaba, Başarılı bir şekilde sayaç hedefini ve kanalını ayarladım!\n Ayarlanmış değerler; Kanal: ${kanal} | Hedef: **${hedef}**\n Şuanda sunucuda **${message.guild.memberCount}** kişi var! **${kalan}** Kişi Sonra **${args[1]}** Kişi Olacaz!`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)	
   }
   
   if(args[0] === "sıfırla") {
	   if(!kanall && !hedeff) {
		   const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Merhaba, Üzgünüm Ancak Ayarlanmamış şeyleri sıfırlayamazsın!`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)	
	   }
	   
	   db.delete(`sayaçH_${message.guild.id}`)
	   db.delete(`sayaçK_${message.guild.id}`)
	   
	   const embedd = new Discord.MessageEmbed()
	 .setColor("BLUE")
	 .setDescription(`Başarılı bir şekilde **sayaç hedefi** ve **sayaç kanalı** sıfırlandı!`)
	 .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
     return message.channel.send(embedd)	
   }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: "sayaç",
    description: "Sayaç ayarlar/sıfırlarsınız.",
    usage: "sayaç <ayarla hedef #kanal/sıfırla>"
}