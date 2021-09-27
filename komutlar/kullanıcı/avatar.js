const Discord = require("discord.js")

exports.run = async(client, message, args) => {
    let kişi = message.mentions.users.filter(s => s.ID !== client.user.id).first() || message.author
    let x1, x2, x3, x4;
 if(kişi.displayAvatarURL({dynamic:true}) === kişi.displayAvatarURL({dynamic:true, format:"gif"})){
   x1=  `[**[GIF]**](${kişi.displayAvatarURL({format:"gif"})})`
 }else{
  x1= "~~**[GIF]**~~"
 }

 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x2=  `[**[PNG]**](${kişi.displayAvatarURL({format:"png"})})`
 } else {
    x2= "~~**[PNG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x3=  `[**[JPG]**](${kişi.displayAvatarURL({format:"jpg"})})`
 } else {
    x3= "~~**[JPG]**~~"
 }
 
 if(kişi.displayAvatarURL({dynamic: true}) === kişi.displayAvatarURL({dynamic:true})) {
	 x4=  `[**[WEBP]**](${kişi.displayAvatarURL({format:"webp"})})`
 } else {
    x4= "~~**[WEBP]**~~"
 }
 

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`${kişi} Adlı kişinin avatarı aşağıda gözükecektir.`)
    .addField("Formatlar", `
    • | ${x1} - ${x2} - ${x3} - ${x4} | •
    `)
    .addField("Büyüklükler", `
    • | **[[x256]](${kişi.displayAvatarURL({ dynamic: true, size: 256 })})** - **[[x1024]](${kişi.displayAvatarURL({ dynamic: true, size: 1024 })})** - **[[x2048]](${kişi.displayAvatarURL({ dynamic: true, size: 2048 })})** - **[[x4096]](${kişi.displayAvatarURL({ dynamic: true, size: 4096 })})** | •
    `)
    .setImage(kişi.displayAvatarURL({ dynamic: true })) 
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
}

exports.help = {
    name: "avatar",
    description: "belirtilen kişinin avatarına bakarsınız.",
    usage: "avatar @kişi"
}