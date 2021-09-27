const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yönetici yetkin yok!")


    let id = makeid(10);
    function makeid(length) {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          }

    const member = message.mentions.users.filter(s => s.ID !== client.user).first()
    const reason = args.slice(1).join(' ');
    if(!member) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Eğer bir kişiye uyarı vermek istiyorsan o kişiyi etiketlemen lazım!`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }

    if(!reason) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Merhaba sayın ${message.author}, Eğer bir kişiye uyarı vermek istiyorsan bir sebep belirtmen lazım!`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
        return message.channel.send(embed)
    }
    
    if(member.id === message.author.id) return message.channel.send("Kendine uyarı veremezsin!")
    if(member.id === client.user.id) return message.channel.send("Kendime uyarı veremem!")
     
    db.push(`uyarı_${member.id}_${message.guild.id}`, { kullanıcı: member.id, sebep: reason, sunucu: message.guild.id, moderator: message.author.id, uyarısayı: id})
    
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`Merhaba sayın ${message.author}, Başarılı bir şekilde uyarı verdim!`)
    .addField("Kişi Bilgileri:", `> Adı: ${member.username}\n> İD: ${member.id}\n> Etiket: ${member}`)
    .addField("Moderator Bilgileri:", `> Adı: ${message.author.username}\n> İD: ${message.author.id}\n> Etiket: ${message.author}`)
    .addField("Uyarı Sebebi:", `> **${reason}**`)
    .addField(`Uyarı Numarası:`, `> **${id}**`)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
    return message.channel.send(embed)




}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyarı", "uyar"]
}

exports.help = {
    name: "warn",
    description: "uyarı verir.",
    usage: "w!warn @kişi sebep"
}