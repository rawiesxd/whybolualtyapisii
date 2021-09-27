const Discord = require("discord.js");
const db = require('quick.db')

var MessageData = [];
module.exports = async(client, msg) => {
  let spam = await db.fetch(`spamEngel_${msg.guild.id}`) 
   if(msg.author.bot) return;
   if(msg.channel.type === undefined || msg.channel.type === null) return;
   if(msg.channel.deleted === true) return;
   if(!msg.guild) return;
   if(!msg.member) return;
   if(!msg.author) return;
   
   if(spam === "açık") {
	
  if (MessageData[msg.author.id] === undefined) {
    MessageData[msg.author.id] = { MesssageNumber: 0, LastMessage: [] };
    setTimeout(() => {
      delete MessageData[msg.author.id];
    }, 15000);
  }
  MessageData[msg.author.id].MesssageNumber += 1;

  MessageData[msg.author.id].LastMessage.push(msg);

 let sayı = await db.fetch(`spamuyarı10_${msg.guild.id}_${msg.author.id}`) 

let muteRole = db.fetch(`muteRole_${msg.guild.id}`)
if(!muteRole) return;
  if (MessageData[msg.author.id].MesssageNumber === 6) {
 
 
      const sendeddd = new Discord.MessageEmbed()
        .setColor("BLUE")
      .setAuthor("WhYBoLu", client.user.avatarURL())
        .setDescription(`\`${msg.author.tag}\` Çok Hızlı Mesaj Atıyorsun Yavaşla Yoksa Susturulursun!`)
    .setFooter(`© www.whybolusite.cf`, client.user.avatarURL())
      .setTimestamp()

    msg.channel.send(sendeddd).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
             var fetched = await msg.channel.messages.fetch({limit: MessageData[msg.author.id].MesssageNumber})
        var fetcheds = fetched.filter(m => m.author.id === msg.author.id).array().slice(0, MessageData[msg.author.id].MesssageNumber)
         msg.channel.bulkDelete(fetcheds)
    }
      if (MessageData[msg.author.id].MesssageNumber === 10) {

          var fetched = await msg.channel.messages.fetch({limit: MessageData[msg.author.id].MesssageNumber})
        var fetcheds = fetched.filter(m => m.author.id === msg.author.id).array().slice(0, MessageData[msg.author.id].MesssageNumber)
         msg.channel.bulkDelete(fetcheds)
      const sendeddd = new Discord.MessageEmbed()
                .setColor("BLUE")
      .setAuthor("WhYBoLu", client.user.avatarURL())
        .setDescription(`\`${msg.author.tag}\` Çok Hızlı Mesaj Atıyorsun Yavaşla Yoksa Susturulursun!`)
    .setFooter(`© www.whybolusite.cf`, client.user.avatarURL())
      .setTimestamp()

    msg.channel.send(sendeddd).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
    
    }
  if (MessageData[msg.author.id].MesssageNumber === 15) {
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

            db.push(`uyarı_${msg.author.id}_${msg.guild.id}`, { kullanıcı: msg.author.id, sebep: "Spam Yapmak", sunucu: msg.guild.id, moderator: client.user.id, uyarısayı: id})

    if (msg.deletable) msg.delete();// yap koy bunu ok
      const spambed = new Discord.MessageEmbed()
        .setColor("RED")
      .setAuthor("WhYBoLu", client.user.avatarURL())//sa as kanka çok az komut kaldı ha v12 yapılmamış .D 9 tane falan bide müzik sistemi eklicez o kadar

      .setDescription(`\`${msg.author.tag}\` Dostum Spamı Devam Ettirdiğin İçin 10 Dakika Susturuldun Açılmaz İse Yetkililere Başvur.`)
    .setTimestamp()  
      .setFooter(`© www.whybolusite.cf`, client.user.avatarURL())
      msg.channel.send(spambed).then(spambed => spambed.delete({time:5000}));
    db.add(`spamuyarı10_${msg.guild.id}_${msg.author.id}`, 1)//değiştimi la silmesi vay amk
        db.add(`günlük_spam`, +1)
    db.add(`spamsayi_${msg.author.id}`, +1)
       let kicksınır = await db.fetch(`kicksınır1_${msg.guild.id}`)
     let bansınır = await db.fetch(`bansınır1_${msg.guild.id}`)
     
   if(kicksınır){
   if (kicksınır == sayı) { // kaç kere susturulduğunda
      //msg.author.kick()// değişme kick siteminden bak bakayım
     msg.guild.member(msg.author).kick();
      const atıldı = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor("WhYBoLu", client.user.avatarURL())
      .setDescription(`\`${msg.author.tag}\` Adlı Kişi Ayarlamış Olduğunuz **${kicksınır}** Uyarısına Ulaştığı İçin Otomatik Sunucudan Attım!`)
      .setTimestamp()
      .setFooter(`© www.whybolusite.cf`, client.user.avatarURL())
 return msg.channel.send(atıldı).then(atıldı => atıldı.delete({time:5000}))
   }
    
       if(bansınır){
    if (sayı >= bansınır) {

    msg.member.ban({reason: `WhYBoLu Anti Spam Sistemi`})
      db.delete(`spamuyarı10_${msg.guild.id}_${msg.author.id}`)//bittimi la
      const atıldı = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor("WhYBoLu", client.user.avatarURL())
      .setDescription(`\`${msg.author.tag}\` Adlı Kişi Ayarlamış Olduğunuz **${bansınır}** Uyarısına Ulaştığı İçin Otomatik Sunucudan Banlandı!`)
      .setTimestamp()
      .setFooter(`© www.whybolusite.cf`, client.user.avatarURL())
      return msg.channel.send(atıldı).then(atıldı => atıldı.delete({time:5000}))
    }
  }
     }
    
    msg.member.roles.cache.forEach(a => {
      db.set(`${msg.guild.id}.spam.${msg.author.id}.roles.${a.id}`, a.id )
      msg.member.roles.remove(a)//değiştimi la bunlar
    })
 msg.member.roles.add(muteRole)
    db.set(`spamvar_${msg.guild.id}`, msg.author.id)
         var fetched = await msg.channel.messages.fetch({limit: MessageData[msg.author.id].MesssageNumber})
        var fetcheds = fetched.filter(m => m.author.id === msg.author.id).array().slice(0, MessageData[msg.author.id].MesssageNumber)
          msg.channel.bulkDelete(fetcheds)

    msg.channel.bulkDelete(10)
        setTimeout(() => {
       msg.guild.members.cache.get(msg.author.id).roles.remove(muteRole)
              db.delete(`spamvar_${msg.guild.id}`)
          msg.guild.roles.cache.forEach(async r => {
const i = await db.fetch(`${msg.guild.id}.spam.${msg.author.id}.roles.${r.id}` )
if(i != r.id)  return;
if(i){
  msg.member.roles.add(i)
}
})
        }, 600000)  // yes 10 dk  ok
    
  
  }   
   }
	if(!spam) return;

};