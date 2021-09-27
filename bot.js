const Discord = require("discord.js")
const client = new Discord.Client({ disableMentions: "everyone", ws: { intents: ["GUILD_MEMBERS", "GUILD_WEBHOOKS", "GUILD_VOICE_STATES", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILDS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_INTEGRATIONS", "GUILD_INVITES", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING"] } });
const wiodb = require("wio.db")
const db = require("quick.db")
const fs = require("fs")
const moment = require("moment");
require("moment-duration-format");
const parse = require("ms")
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0', client, { webhookPort: 5000, webhookAuth: 'alicanensar1' });
const express = require('express')
const app = express() // Your express app
 
client.ayarlar = {
  "token": "ODkyMDk1OTI5MTE5ODEzNjUy.YVH7Ew.6-QaPGjJwqIrGuC02aSc1wRzVXg",
  "sahip": ["759095243080597565", "440575579335557121"],
  "prefix": "w!",
  "renk": "BLUE",
  "botİsim": "WhYBoLu",
  "embedRenk": "BLUE",
  "embedFooter": "Copyright © WhYBoLu Bot 2020 | Sponsor: martihost.com",
  "version": "3.5",
  "destek": "https://discord.gg/UDTnPVRKQe",
  "website": "https://www.whybolusite.cf/"
}

dbl.on('posted', () => {
  console.log('Sunucu sayısı postlandı!');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
}) 
 
client.on("ready", async() => {
  //db.delete("küfür") 
   //db.delete("günlük_reklam")
  // db.delete("günlük_capslock")
  //b.delete("günlük_spam")
 // db.delete("günlük_link")
  console.log("•--------------•")
  console.log(`Aktif oldum, ${client.guilds.cache.size} Adet sunucuya ve ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Adet kullanıcıya hizmet ediyorum, Toplamda ${client.commands.size} Adet komutum var!`)
  console.log("•--------------•")
  client.user.setActivity(`${client.ayarlar.prefix}yardım | WhYBoLu Bot`)
  
  setInterval(() => {
        dbl.postStats(client.guilds.cache.size, client.shard.ids, client.shard.count);
    }, 1800000);
	
  kontrol()
  kontrol2()
})
 
 function kontrol() {
	 client.users.cache.forEach(üye => {
    setInterval(() => {
      let x = db.fetch(`goldsüre_${üye.id}`); // bu sürede bitecek (timestamp)
      let cc = db.has(`goldsüre_${üye.id}`); // bu sürede bitecek (timestamp)
    if(cc === true) {
    if(x < Date.now()) {
let kanal = new Discord.WebhookClient("787280276522926091", "uFN-llu0x7WSMLVGrQR2WfmcyE9WCoiVyzUnoR2HdmNVYP0tUqj0aPhaSEvmt48hgySZ")
db.delete(`üyelikk_${üye.id}`);
db.delete(`goldsüre_${üye.id}`);
const kazandı = new Discord.MessageEmbed()
.setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL({ dynamic: true }))
.setColor(client.ayarlar.embedRenk)
.setDescription(`
${üye} (${üye.id}) Adlı kullanıcının özel üyelik süresi bitti.
`)
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL({ dynamic: true }))
kanal.send(kazandı)

      }
}

if(!x) return;
if(!cc) return;

}, 1800000)
  })
 }

 function kontrol2() {
  client.users.cache.forEach(üye => {
   setInterval(() => {
     let x = db.fetch(`çalışSüre_${üye.id}`); // bu sürede bitecek (timestamp)
     let cc = db.has(`çalışSüre_${üye.id}`); // bu sürede bitecek (timestamp)
   if(cc === true) {
   if(x < Date.now()) {
db.delete(`çalışSüre_${üye.id}`);
  }
}

if(!x) return;
if(!cc) return;

}, 1800000)
 })

 client.users.cache.forEach(üye => {
  setInterval(() => {
    let x = db.fetch(`günlükSüre_${üye.id}`); // bu sürede bitecek (timestamp)
    let cc = db.has(`günlükSüre_${üye.id}`); // bu sürede bitecek (timestamp)
  if(cc === true) {
  if(x < Date.now()) {
db.delete(`günlükSüre_${üye.id}`);
 }
}

if(!x) return;
if(!cc) return;

}, 1800000)
})
}

client.on("warn", warn => {
  console.log(`Bir Uyarı Belirdi: ${warn}`)
})

client.on("error", error => {
  console.log(`Bir Hata Çıktı: ${error}`)
})

/* komut yükleme başlangıç */
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./komutlar').forEach(dir => {
  fs.readdir(`./komutlar/${dir}/`, (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
      let props = require(`./komutlar/${dir}/${f}`);
      console.log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
})

let slowMode = new Map();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

client.on("message", async message => {
        if(message.author.bot) return;
        if(!message.guild) return;
        let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
        if(!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
		const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
        //if (!message.content.startsWith(prefix)) return;
       // const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
      //  const command = args.shift().toLowerCase()
        let cmd;
        if (client.commands.has(command)) {
          cmd = client.commands.get(command);
        } else if (client.aliases.has(command)) {
          cmd = client.commands.get(client.aliases.get(command));
        }
        if (cmd) {

          let karaliste = db.fetch(`karalist_${message.author.id}`, "aktif")
          let karalistesebep = db.fetch(`sebep_${message.author.id}`)
          if (karaliste == "aktif") {
      let karaliste = new Discord.MessageEmbed()
      .setColor(client.ayarlar.embedRenk)
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Üzgünüm ancak komutları kullanamazsınız! Kurucularımız tarafından **${karalistesebep}** sebebiyle komutları kullanmanız yasaklandı!.`)
      .setImage("https://cdn.discordapp.com/attachments/742686392416731136/742688052496826428/20200811_131630.png")
      
      return message.channel.send(karaliste)
          }

      let karalistee = db.fetch(`sunucukaraliste_${message.guild.id}`, "aktif")
          if (karalistee == "aktif") {
      let karalisteee = new Discord.MessageEmbed()
      .setColor(client.ayarlar.embedRenk)
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      .setDescription(`Üzgünüm ancak komutları kullanamazsınız! Kurucularımız tarafından bu sunucu karalisteye alındı!.`)
      .setImage("https://cdn.discordapp.com/attachments/742686392416731136/742688052496826428/20200811_131630.png")      
      return message.channel.send(karalisteee)
        }
                    let memberSlowMode = slowMode.get(message.author.id);
			 if(memberSlowMode && memberSlowMode > Date.now()) {
            let timeout = (memberSlowMode - Date.now()) / 1000;
            message.delete({timeout: 5000})
            const embed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor("Lütfen Bekle!", message.author.avatarURL({dynamic: true}))
           .setDescription(`Komutu Kullanabilmek İçin \`${timeout.toFixed(1)}\` Saniye Beklemelisin!`)
          .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
           .setTimestamp()
          return message.channel.send(embed).then((msg) => { msg.delete({timeout: 5000})})
        }
          slowMode.set(message.author.id, (Date.now() + 7000))
          setTimeout(() => {
            slowMode.delete(message.author.id)
          }, 10000)
		   
        let time = Date.now() - message.author.createdTimestamp
          
          if (time < 604800000) {
            let text = []
            time = Date.now() - message.author.createdTimestamp
            time = 604800000 - time 
            Object.entries(parse(time)).map((x, y) => {
              if (x[1] > 0 && y < 4) text.push(`**${x[1]} ${x[0]}**`) 
            })
        
             let fakehesapkoruma = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setDescription(`Dostum, Sahibim tarafından alınan önlem sonucunda **Yeni Açılmış** hesapların WhYBoLuyu kullanması yasaklanmıştır, bu nedenle ${text.join(", ")} süresi boyunca beklemelisin!`)
             .setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
            return message.channel.send(fakehesapkoruma) 
            } 
			
			if(!message.author.avatarURL()) return message.channel.send("WhYBoLuyu kullanmak istiyorsan eğer bir avatarın olmalı!")
			
		    if(!db.fetch(`kurallarkabuledildi_${message.author.id}`)) {
			const kurallarkabul = new Discord.MessageEmbed()
			.setAuthor(client.user.username, client.user.avatarURL())
			.setThumbnail(message.author.avatarURL({format:"gif", dynamic: true}))
			.setColor(client.ayarlar.embedRenk)
			.addField("Merhaba!", `Merhaba sayın ${message.author} adlı üyemiz!\nEğer WhYBoLuyu kullanmak istiyorsan kurallarımızı kabul etmelisin! eğer kurallarımızı kabul etmezsen WhYBoLuyu Kullanamazsın!`)
			.addField("Kurallar;", "1 - WhYBoLu'nun herhangi bir şekilde altyapısını çıkarmaya çalışmamak,\n2 - Komut spamı yapmamak,\n3 - WhYBoLu ve Kurucuları hakkında herhangi bir şekilde **Hakareti Küfür** gibi rahatsız edici davranışlarda bulunmamamak,\n4 - WhYBoLuda herhangi bir hata ve ya açık bulup kullanmayıp direk yetkililere bildirmek,\n4 - Etrafta dolanan **Ben WhYBoLu** botunun sahibiyim diye gezinen kişileri bildirmek\n5 - Karalisteye girecek hareketlerde bulunmamamak\n6 - Troll yapmamak\n\n Kurallarımız bunlardır eğer kurallarımızı kabul ediyorsanız :white_check_mark: Emojisine tıklayın!")
			.addField("Not:", `Kuralları kabul ederek sorumluluğu üzerinize alıyorsunuz.\n **${db.fetch(`kurallarkabuleden`)}** Adet kişi kurallarımızı kabul etdi!`)
			.setFooter("Copyright © WhYBoLu Bot 2020", client.user.avatarURL())
			return message.channel.send(kurallarkabul).then(kurallar => {
        kurallar.react("✅")
        kurallar.delete({ timeout: 5000 })

          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
		  
          let yes = kurallar.createReactionCollector(yesFilter, { time: 0 });

          yes.on("collect", r => {
        kurallar.delete()
        message.delete()
            db.set(`kurallarkabuledildi_${message.author.id}`, "kabuletdi")
            db.add(`kurallarkabuleden`, 1)
            return message.channel.send(`${message.author} Kurallarımızı kabul etdiniz! lütfen kurallarımıza uyun! iyi günler!`).then(msg => {msg.delete({timeout: 5000})})
          });
		 
			})
			}
			

        cmd.run(client, message, args, prefix);
      }
})

client.on("message", async(message) => {
	let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix;
	
  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    const whybolumesaj = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Selam ${message.author}, Ben **${client.ayarlar.botİsim} Bot** Sanırsam beni etiketledin!
    • | Fazla uzatmadan sana kendimden bahsedeyim!

    • | 2019 Ekim ayında TheClawNz#6717 Tarafından oluşturuldum, Amacım: **Sizlerin sunucusunu koruyup eğlendirmek!**
    • | Önemli Komutlar: \`${prefix}yardım, ${prefix}oyver, ${prefix}davet\`
    `)
    .addField(":link: | Bağlantılar", `
    • [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucum](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) •
    `)
    .setImage("https://cdn.discordapp.com/attachments/781581261579223121/782679504614195240/standard_14.gif")
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
  message.channel.send(whybolumesaj)  
  }
})

client.on("guildCreate", guild => {
	if(guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) {
		let role = guild.roles.cache.find(r => r.name === "@everyone");
      guild.channels.create('whybolu', 'text').then(kurallar => {
         kurallar.createOverwrite(role, {
    SEND_MESSAGES: false
  })  
  
  const whybolumesaj = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, guild.iconURL({ dynamic: true }))
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`
  > • | Selam sayın sunucu üyeleri!
  > • | Ben **WhYBoLu**, Amacım: \`Sunucunuzu en iyi ve en hızlı şekilde koruyup sizlere güzel bir hizmet vermek!\`,
  > • | Genel Bilgiler:
  > • | Prefix: **${client.ayarlar.prefix} (Değiştirilebilir)**
  `)
  .addField("<a:sahip:776891798336438313> | Beğenebileceğiniz komutlar:", `
  > • | [${client.ayarlar.prefix}yardım](${client.ayarlar.destek}) => **Yardım menümü gösterir.**
  > • | [${client.ayarlar.prefix}istatistik](${client.ayarlar.destek}) => **İstatistiklerime bakarsınız.**
  > • | [${client.ayarlar.prefix}shard](${client.ayarlar.destek}) => **Shard bilgilerime bakarsınız.**
  `)
  .addField(":link: | Bağlantılar", `
  • [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucum](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) •
  `)
  .setImage("https://cdn.discordapp.com/attachments/781581261579223121/782679504614195240/standard_14.gif")
  .setFooter(client.ayarlar.embedFooter, guild.iconURL({ dynamic: true }))
kurallar.send(whybolumesaj).catch(console.error);
})
	}
});

client.on("guildCreate", guild => {
  if(guild.members.cache.get(guild.owner.user.tag)) {

    if(guild.id === "697156628033830913" && guild.id === "748611978833952990") {
      return guild.leave()
    }
    if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
      return guild.leave()
    }
    if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
      return guild.leave()
    }
    
    let karaliste;
    if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
      karaliste = "Evet"
    } else {
      karaliste = "Hayır"
    }
    
    let karaliste2;
    if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
      karaliste2 = "Evet"
    } else {
      karaliste2 = "Hayır"
    }
    
    let kanal = new Discord.WebhookClient("785932439851106356", "u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO")
    let giriş = new Discord.MessageEmbed()//https://discord.com/api/webhooks/785932439851106356/u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO
     .setColor(client.ayarlar.embedRenk)
     .setAuthor(`${guild.name} Adlı sunucuya eklendim!`, client.user.avatarURL())
     .addField("<a:sunucu:777505899321360394> | Sunucu Bilgileri", `
     > • | Sunucu Adı: **\`${guild.name}\`**
     > • | Sunucu ID: **\`${guild.id}\`**
     > • | Sunucu Üye Sayısı: **\`${guild.memberCount}\`**
     > • | Sunucu Karalistedemi?: **\`${karaliste}\`**
     `, true)
     .addField("<a:sahip:776891798336438313> | Sahip Bilgileri", `
     > • | Sahip Adı: **\`${guild.members.cache.get(guild.ownerID).user.tag}\`**
     > • | Sahip ID: **\`${guild.ownerID}\`**
     > • | Karalistedemi?: **\`${karaliste2}\`**
     `, true)
     .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
     kanal.send(giriş).catch(console.error);
  } else {
    
	if(guild.id === "697156628033830913" && guild.id === "748611978833952990") {
		return guild.leave()
	}
  if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
	  return guild.leave()
  }
  if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
    return guild.leave()
  }
  
  let karaliste;
  if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
	  karaliste = "Evet"
  } else {
	  karaliste = "Hayır"
  }
  
  let karaliste2;
  if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
	  karaliste2 = "Evet"
  } else {
	  karaliste2 = "Hayır"
  }
  
  let kanal = new Discord.WebhookClient("785932439851106356", "u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO")
  let giriş = new Discord.MessageEmbed()//https://discord.com/api/webhooks/785932439851106356/u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO
   .setColor(client.ayarlar.embedRenk)
   .setAuthor(`${guild.name} Adlı sunucuya eklendim!`, client.user.avatarURL())
   .addField("<a:sunucu:777505899321360394> | Sunucu Bilgileri", `
   > • | Sunucu Adı: **\`${guild.name}\`**
   > • | Sunucu ID: **\`${guild.id}\`**
   > • | Sunucu Üye Sayısı: **\`${guild.memberCount}\`**
   > • | Sunucu Karalistedemi?: **\`${karaliste}\`**
   `, true)
   .addField("<a:sahip:776891798336438313> | Sahip Bilgileri", `
   > • | Sahip Adı: **\`Bilinmiyor\`**
   > • | Sahip ID: **\`${guild.ownerID}\`**
   > • | Karalistedemi?: **\`${karaliste2}\`**
   `, true)
   .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
   kanal.send(giriş).catch(console.error);
  }
});

client.on("guildDelete", guild => {
  if(guild.members.cache.get(guild.owner.user.tag)) {
    let kanal = new Discord.WebhookClient("785932439851106356", "u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO")
    let karaliste;
    if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
      karaliste = "Evet"
    } else {
      karaliste = "Hayır"
    }
    
    let karaliste2;
    if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
      karaliste2 = "Evet"
    } else {
      karaliste2 = "Hayır"
    }
  
    db.delete(`küfürE_${guild.id}`)
    db.delete(`capslock_${guild.id}`)
    db.delete(`linkK_${guild.id}`)
    db.delete(`reklamK_${guild.id}`)
    db.delete(`saas_${guild.id}`)
    db.delete(`otorolR_${guild.id}`);
    db.delete(`otorolK_${guild.id}`);
    db.delete(`otorolmesaj_${guild.id}`);
    db.delete(`bototorolR_${guild.id}`);
    db.delete(`bototorolK_${guild.id}`);
    db.delete(`bototorolmesaj_${guild.id}`);
    db.delete(`sayaçK_${guild.id}`)
    db.delete(`sayaçH_${guild.id}`)
    db.delete(`sayaçMHG_${guild.id}`)
    db.delete(`sayacMBB_${guild.id}`)
    db.delete(`spamEngel_${guild.id}`)
    db.delete(`spamvar_${guild.id}`) 
    db.delete(`muteRole_${guild.id}`)
    db.delete(`modlog_${guild.id}`)
    db.delete(`kayıtkanal_${guild.id}`)
    db.delete(`kayıttag_${guild.id}`)
    db.delete(`kayıtyetkilirol_${guild.id}`)
    db.delete(`kayıtmesaj_${guild.id}`)
    db.delete(`kayıtembedfooter_${guild.id}`)
    db.delete(`kayıtembedrenk_${guild.id}`)
    db.delete(`kayıtembedauthor_${guild.id}`)
    db.delete(`kayıtembedimage_${guild.id}`)
    db.delete(`kayıtembedthumbnail_${guild.id}`)
  
    
    guild.members.cache.filter(s => db.has(`uyarı_${s.id}_${guild.id}`) === true).forEach(sa => {
      db.delete(`uyarı_${sa.id}_${guild.id}`)
    })
  
    guild.members.cache.filter(s => db.has(`kayıt_${s.id}_${guild.id}`) === true).forEach(sa => {
      db.delete(`kayıt_${sa.id}_${guild.id}`)
      db.delete(`erkekkayıt_${sa.id}_${guild.id}`)
      db.delete(`kızkayıt_${sa.id}_${guild.id}`)
    })
  
    let çıkış = new Discord.MessageEmbed()//https://discord.com/api/webhooks/770676502278307851/w00fg-wnr3o3xZyA4ZA53sJTjivkKOveC3aESxQYXbzjZSGtPliOmIUVaoxAbg2so-W4
     .setColor(client.ayarlar.embedRenk)
     .setAuthor(`${guild.name} Adlı sunucudan atıldım!`, client.user.avatarURL())
     .addField("<a:sunucu:777505899321360394> | Sunucu Bilgileri", `
     > • | Sunucu Adı: **\`${guild.name}\`**
     > • | Sunucu ID: **\`${guild.id}\`**
     > • | Sunucu Üye Sayısı: **\`${guild.memberCount}\`**
     > • | Sunucu Karalistedemi?: **\`${karaliste}\`**
     `, true)
     .addField("<a:sahip:776891798336438313> | Sahip Bilgileri", `
     > • | Sahip Adı: **\`${guild.members.cache.get(guild.ownerID).user.tag}\`**
     > • | Sahip ID: **\`${guild.ownerID}\`**
     > • | Karalistedemi?: **\`${karaliste2}\`**
     `, true)
     .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
   kanal.send(çıkış).catch(console.error);
  } else {
    let kanal = new Discord.WebhookClient("785932439851106356", "u-OD0oZsnPYZGSyhBXyFg9FWvv9dGRmtW4IWyeqWYS610DlDggwypAj0o_zjUYo2ZIyO")
    let karaliste;
    if(db.fetch(`sunucukaraliste_${guild.id}`) === "aktif") {
      karaliste = "Evet"
    } else {
      karaliste = "Hayır"
    }
    
    let karaliste2;
    if(db.fetch(`karaliste_${guild.ownerID}`) === "aktif") {
      karaliste2 = "Evet"
    } else {
      karaliste2 = "Hayır"
    }
  
    db.delete(`küfürE_${guild.id}`)
    db.delete(`capslock_${guild.id}`)
    db.delete(`linkK_${guild.id}`)
    db.delete(`reklamK_${guild.id}`)
    db.delete(`saas_${guild.id}`)
    db.delete(`otorolR_${guild.id}`);
    db.delete(`otorolK_${guild.id}`);
    db.delete(`otorolmesaj_${guild.id}`);
    db.delete(`bototorolR_${guild.id}`);
    db.delete(`bototorolK_${guild.id}`);
    db.delete(`bototorolmesaj_${guild.id}`);
    db.delete(`sayaçK_${guild.id}`)
    db.delete(`sayaçH_${guild.id}`)
    db.delete(`sayaçMHG_${guild.id}`)
    db.delete(`sayacMBB_${guild.id}`)
    db.delete(`spamEngel_${guild.id}`)
    db.delete(`spamvar_${guild.id}`) 
    db.delete(`muteRole_${guild.id}`)
    db.delete(`modlog_${guild.id}`)
    db.delete(`kayıtkanal_${guild.id}`)
    db.delete(`kayıttag_${guild.id}`)
    db.delete(`kayıtyetkilirol_${guild.id}`)
    db.delete(`kayıtmesaj_${guild.id}`)
    db.delete(`kayıtembedfooter_${guild.id}`)
    db.delete(`kayıtembedrenk_${guild.id}`)
    db.delete(`kayıtembedauthor_${guild.id}`)
    db.delete(`kayıtembedimage_${guild.id}`)
    db.delete(`kayıtembedthumbnail_${guild.id}`)
  
    
    guild.members.cache.filter(s => db.has(`uyarı_${s.id}_${guild.id}`) === true).forEach(sa => {
      db.delete(`uyarı_${sa.id}_${guild.id}`)
    })
  
    guild.members.cache.filter(s => db.has(`kayıt_${s.id}_${guild.id}`) === true).forEach(sa => {
      db.delete(`kayıt_${sa.id}_${guild.id}`)
      db.delete(`erkekkayıt_${sa.id}_${guild.id}`)
      db.delete(`kızkayıt_${sa.id}_${guild.id}`)
    })
  
    let çıkış = new Discord.MessageEmbed()//https://discord.com/api/webhooks/770676502278307851/w00fg-wnr3o3xZyA4ZA53sJTjivkKOveC3aESxQYXbzjZSGtPliOmIUVaoxAbg2so-W4
     .setColor(client.ayarlar.embedRenk)
     .setAuthor(`${guild.name} Adlı sunucudan atıldım!`, client.user.avatarURL())
     .addField("<a:sunucu:777505899321360394> | Sunucu Bilgileri", `
     > • | Sunucu Adı: **\`${guild.name}\`**
     > • | Sunucu ID: **\`${guild.id}\`**
     > • | Sunucu Üye Sayısı: **\`${guild.memberCount}\`**
     > • | Sunucu Karalistedemi?: **\`${karaliste}\`**
     `, true)
     .addField("<a:sahip:776891798336438313> | Sahip Bilgileri", `
     > • | Sahip Adı: **\`Bilinmiyor\`**
     > • | Sahip ID: **\`${guild.ownerID}\`**
     > • | Karalistedemi?: **\`${karaliste2}\`**
     `, true)
     .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
   kanal.send(çıkış).catch(console.error);
  }
  
});
/*  eklendim atıldım bitiş */
 
//sa as
client.on("message", async message => {
  const a = message.content.toLowerCase();
  if (
    a === "slam" ||
    a === "sa" ||
    a === "selamun aleyküm" ||
    a === "selamın aleyküm" ||
    a === "selam" ||
    a === "slm" ||
    a === "Sa"
  ) {
    let i = await db.fetch(`saas_${message.guild.id}`);
    if(!i) return;
    if (i === "acik") {

        const embed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setTitle("WhYBoLu")
        .setDescription("**Aleyküm Selam, Hoşgeldin!**")
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }));
      message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
      
      
    }
  }
});
//sa as
/*
//gold üye
client.on("message", async message => {
  const db = require("quick.db");
  const ms2 = require("parse-ms");
  let timeout = 3600000; //süresini dilediğiniz gibi kısaltabilirsiniz.
  let dakdest = 1;
  let i = db.fetch(`üyelikk_${message.author.id}`);
  
  if (db.fetch(`üyelikk_${message.author.id}`) === "aktif") {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
      let time = ms2(timeout - (Date.now() - dakdest));
    } else {
      if (message.author.bot) return;
      if(message.content.length >= 20){
        var embed = new Discord.MessageEmbed()
        .setAuthor(`WhYBoLu`,`${message.author.avatarURL() || message.author.displayAvatarURL()}`)
        .setDescription(`<a:gold1:719860487734427708> Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${message.author.id}>`)
        .setColor("RANDOM")
        message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
      }
    }
  } else if(i === undefined || i === null) return;
  if(!i) return;
});
//gold üye
*/

//otorol

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorolR_${member.guild.id}`);
  let kanal = await db.fetch(`otorolK_${member.guild.id}`);
  let mesaj = await db.fetch(`otorolmesaj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;
  if(member.user.bot) return;
  if(!member.guild.roles.cache.get(rol)){
    db.delete(`otorolmesaj_${member.guild.id}`);
    db.delete(`otorolR_${member.guild.id}`);
    if(member.guild.channels.cache.get(kanal)){
     member.guild.channels.cache.get(kanal).send(`Belirlenen Rol Bulunamadı! Bu Yüzden Sıfırlandı!`)
      member.send("Oto Verilcek Rol Ve Kanal Bulunamadığı İçin Otomatik Rol Verme Sıfırlandı Yetkililere Söylemeniz Rica Edilir!").catch(s => console.log(s))
     db.delete(`otorolK_${member.guild.id}`);
    } else {
       db.delete(`otorolK_${member.guild.id}`);
      member.send("Oto Verilcek Rol Ve Kanal Bulunamadığı İçin Otomatik Rol Verme Sıfırlandı Yetkililere Söylemeniz Rica Edilir!").catch(s => console.log(s))
   
    }
    return;
  }
if(member.guild.roles.cache.get(rol) && member.guild.channels.cache.get(kanal)){
member.roles.add(rol);
  if (db.has(`üyelikk_${member.id}`) === true) {
    if (!member.guild.channels.cache.get(kanal)) return;
    member.guild.channels.cache.get(kanal).send(`<a:gold1:719860487734427708> ${member} Adlı Gold Üye Sunucuya Katıldı! Seninle beraber **${member.guild.memberCount}** Kişiyiz! <a:onaylandi:698113364026720267>`).catch(s => console.log(s))
  } else {
  if (!mesaj) {
    client.channels.cache.get(kanal).send(`<a:giris:699630839570628689> Hoşgeldin ${member} Otomatik Rol Verildi Seninle **${member.guild.memberCount}** kişiyiz <a:onaylandi:698113364026720267>`).catch(s => console.log(s))
    return;
  } else {
    var mesaj2 = mesaj
      .replace(`{sunucuadı}`, `**${member.guild.name}**`)
	    .replace(`{sunucuüyesayısı}`, `**${member.guild.memberCount}**`)
      .replace(`{kullanıcı}`, `${member}`)
      .replace(`{kullanıcı_adı}`, `**${member.user.username}**`)
      .replace(`{roladı}`, `**${member.guild.roles.cache.get(rol).name}**`);
    client.channels.cache.get(kanal).send(mesaj2).catch(s => console.log(s))
    return;
  }}
  }
});

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`bototorolR_${member.guild.id}`);
  let kanal = await db.fetch(`bototorolK_${member.guild.id}`);
  let mesaj = await db.fetch(`bototorolmesaj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;
  if(!member.user.bot) return;
  if(!member.guild.roles.cache.get(rol)){
    db.delete(`bototorolmesaj_${member.guild.id}`);
    db.delete(`bototorolR_${member.guild.id}`);
    if(member.guild.channels.cache.get(kanal)){
     member.guild.channels.cache.get(kanal).send(`Belirlenen Rol Bulunamadı! Bu Yüzden Sıfırlandı!`)
     db.delete(`bototorolK_${member.guild.id}`);
    } else {
     db.delete(`bototorolK_${member.guild.id}`);
    } return;
  }
if(member.guild.roles.cache.get(rol) && member.guild.channels.cache.get(kanal)){
member.roles.add(rol);
  if (!mesaj) {
    client.channels.cache.get(kanal).send(`<a:giris:699630839570628689> Hoşgeldin ${member} Otomatik Rol Verildi Seninle **${member.guild.memberCount}** kişiyiz <a:onaylandi:698113364026720267> [Bot]`).catch(s => console.log(s))
    return;
  } else {
    var mesaj2 = mesaj
      .replace(`{sunucuadı}`, `**${member.guild.name}**`)
	  .replace(`{sunucuüyesayısı}`, `**${member.guild.memberCount}**`)
      .replace(`{kullanıcı}`, `${member}`)
      .replace(`{kullanıcı_adı}`, `**${member.user.username}**`)
      .replace(`{roladı}`, `**${member.guild.roles.cache.get(rol).name}**`);
    client.channels.cache.get(kanal).send(mesaj2).catch(s => console.log(s))
    return;
  }}
});
//OTOROL

//sayaç
client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayaçK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayaçH_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayaçMHG_${member.guild.id}`)
  if (!member.guild.channels.cache.get(kanal)) return;
    if (member.guild.memberCount > sayaç) {
    db.delete(`sayaçK_${member.guild.id}`)
    db.delete(`sayaçH_${member.guild.id}`)
    db.delete(`sayaçMHG_${member.guild.id}`)
    db.delete(`sayacMBB_${member.guild.id}`)
   return client.channels.cache.get(kanal).send(`<a:onaylandi:698113364026720267> Sayaç Sıfırlandı! \`${member.guild.memberCount}\` Kişiyiz!`).catch(s => console.log(s))
  }
  if (db.has(`üyelikk_${member.id}`) === true) {
    member.guild.channels.cache.get(kanal).send(`<a:gold1:719860487734427708> ${member} Adlı Gold Üye Sunucuya Katıldı! **${sayaç}** Kişi Olmamıza **${sonuç}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz! <a:onaylandi:698113364026720267> `).catch(s => console.log(s))
  } else { 
    if (!mesaj) {
    return client.channels.cache.get(kanal).send(`<a:giris:699630839570628689> ${member} Adlı Kullanıcı Sunucuya Katıldı! **${sayaç}** Kişi Olmamıza **${sonuç}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz! <a:onaylandi:698113364026720267> `).catch(s => console.log(s))
  } else {
    const mesaj31 = mesaj.replace("{kullanıcı}", `${member}`).replace("{sunucuadı}", `**${member.guild.name}**`).replace("{sunucuüyesayısı}", `**${member.guild.memberCount}**`).replace("{kullanıcı_adı}", `**${member.user.username}**`).replace("{kalanüye}", `**${sonuç}**`)
    return client.channels.cache.get(kanal).send(mesaj31).catch(s => console.log(s))
    
  }
  }
});
client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayaçK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayaçH_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayaçMBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
    if (member.guild.channels.cache.get(kanal)){
  if (db.has(`üyelikk_${member.id}`) === true) {
    member.guild.channels.cache.get(kanal).send(`<a:gold1:719860487734427708> ${member} Adlı Gold Üye Sunucudan Ayrıldı. **${sayaç}** Kişi Olmamıza **${sonuç}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz!`).catch(s => console.log(s))
  } 
  if (!mesaj) {
    return client.channels.cache.get(kanal).send(`<a:cikis:699884661899264090> ${member} Adlı Kullanıcı Sunucudan Ayrıldı. **${sayaç}** Kişi Olmamıza **${sonuç}** Kişi Kaldı **${member.guild.memberCount}** Kişiyiz!`).catch(s => console.log(s))
  }
  if (mesaj) {
    const mesaj31 = mesaj.replace("{kullanıcı}", `${member}`).replace("{sunucuadı}", `**${member.guild.name}**`).replace("{sunucuüyesayısı}", `**${member.guild.memberCount}**`).replace("{kullanıcı_adı}", `**${member.user.username}**`).replace("{kalanüye}", `**${sonuç}**`)
    return client.channels.cache.get(kanal).send(mesaj31).catch(s => console.log(s))
  }
     }
});
//sayaç
 
//Capslock Engel
client.on("message", async (message) => {
  if(!message.guild) return;
  if(message.author.bot) return;
  let capslock = db.fetch(`capslock_${message.guild.id}`)

  if(capslock === "aktif") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      if(message.mentions.channels.first()) return;
	  let caps = message.content.replace(" ", "").toUpperCase();
      let emoji = message.guild.emoji
      if(message.content.startsWith("https://") || message.content.startsWith("http://")) return;
      if(message.content === message.guild.emoji) return;
      if(message.content === caps) {
        let mesajj = [
          `${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın büyük harfle yazması?`,
          `${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Büyük Harf Engel Filtresi aktif! Bu yüzden büyük harfle yazamazsın!`,
          `${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden büyük harfle yazamazsın!`,
          `${message.author}, Hop! Terbiyeni koru! bu sunucuda büyük harfle yazamazsın!`
        ]
          let mesaj = Math.floor((Math.random() * mesajj.length));

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

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Büyük Harfle Yazmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add("günlük_capslock", +1)

            message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        }
    }
  }

  if(!capslock) return;
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if(!oldMessage.guild) return;
  if(oldMessage.author.bot) return;

  let capslock = db.fetch(`capslock_${oldMessage.guild.id}`)

  if(capslock === "aktif") {
    if(!oldMessage.member.hasPermission("MANAGE_MESSAGES")) {
      if(newMessage.mentions.channels.first()) return;
      let emoji = oldMessage.guild.emoji
      if(newMessage.content.startsWith("https://") || newMessage.content.startsWith("http://")) return;
      if(newMessage.content === emoji) return;
      if(newMessage.content.toUpperCase()) {
        let mesajj = [
          `${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın büyük harfle yazması?`,
          `${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Büyük Harf Engel Filtresi aktif! Bu yüzden büyük harfle yazamazsın!`,
          `${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden büyük harfle yazamazsın!`,
          `${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda büyük harfle yazamazsın!`
        ]
          let mesaj = Math.floor((Math.random() * mesajj.length));

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

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Büyük Harfle Yazmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add("günlük_capslock", +1)

            newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({dynamic: true}))
            return oldMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
        } else return;
    } else return;
  }

  if(!capslock) return;
})
//Capslock Engel

//Küfür Engel
client.on("message", message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let küfür = db.fetch(`küfürE_${message.guild.id}`)

  if(küfür === "aktif") {
   if(message.member.hasPermission("ADMINISTRATOR")) return;
   let kufur = require("./küfürler.json")
   let mesajj = [
    `${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insana küfür etmek ?`,
    `${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Küfür Engel Filtresi aktif! Bu yüzden küfür edemezsin!`,
    `${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden küfür edemezsin!`,
    `${message.author}, Hop! Terbiyeni koru! bu sunucuda küfür edemezsin!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if(kufur.some(word => message.content.includes(word))) {
          if (!message.mentions.users.first()) {
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

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Küfür Etmek", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`küfür`, +1)
			      message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!küfür) return;
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;

  let küfür = db.fetch(`küfürE_${oldMessage.guild.id}`)

  if(küfür === "aktif") {
   if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;
   let kufur = require("./küfürler.json")
   let mesajj = [
    `${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insana mesajını düzenleyerek küfür etmek ?`,
    `${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Küfür Engel Filtresi aktif! Bu yüzden küfür mesajını düzenleyerek edemezsin!`,
    `${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek küfür edemezsin!`,
    `${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek küfür edemezsin!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if(kufur.some(word => newMessage.content.includes(word))) {
          if (!oldMessage.mentions.users.first()) {
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

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Küfür Etmek", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`küfür`, +1)
			      newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({dynamic: true}))
            return newMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!küfür) return;
})
//Küfür Engel

//Link Engel
client.on("message", message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
  let linkk = db.fetch(`linkK_${message.guild.id}`)

  if(linkk === "aktif") {
   if(message.member.hasPermission("ADMINISTRATOR")) return;
   let link = ["https://", "http://", "http", "https", "www", "www.", ".ly", ".com", ".net", ".com.tr", ".org", ".xyz", ".istanbul", ".store", "site", ".glitch.me", ".ml", ".cf", ".tk", ".rf", ".gf", ".org.tr", ".net.tr", ".info", ".av.tr", ".gen.tr", ".k12.tr", ".bel.tr", ".info.tr", ".biz.tr", ".gov.tr", ".web.tr", ".tv.tr", ".online", ".host", ".website", ".club", ".kim", ".email", ".store", ".blog", ".tech", ".promo", ".pink", ".blue", ".cafe", ".center", ".chat", ".city", ".company", ".life", ".ltd", ".media", ".salon", ".run", ".co", ".us", ".name", ".tv", ".pro", ".mobi", ".ist", ".cc", ".biz", ".bbs.tr", ".dr.tr", ".gg", ".me"]
   /*var regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );*/
   let mesajj = [
    `${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın link atması?`,
    `${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Link Engel Filtresi aktif! Bu yüzden link atamazsın!`,
    `${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden link atamazsın!`,
    `${message.author}, Hop! Terbiyeni koru! bu sunucuda link atamazsın!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if (link.some(word => message.content.includes(word)) === true) {
          if (!message.mentions.users.first()) {
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

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Link Atmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_link`, +1)
			      message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!linkk) return;
})

client.on("messageUpdate", (oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;

  let linkk = db.fetch(`linkK_${oldMessage.guild.id}`)

  if(linkk === "aktif") {
   if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;
   let link = ["https://", "http://", "http", "https", "www", "www.", ".ly", ".com", ".net", ".com.tr", ".org", ".xyz", ".istanbul", ".store", "site", ".glitch.me", ".ml", ".cf", ".tk", ".rf", ".gf", ".org.tr", ".net.tr", ".info", ".av.tr", ".gen.tr", ".k12.tr", ".bel.tr", ".info.tr", ".biz.tr", ".gov.tr", ".web.tr", ".tv.tr", ".online", ".host", ".website", ".club", ".kim", ".email", ".store", ".blog", ".tech", ".promo", ".pink", ".blue", ".cafe", ".center", ".chat", ".city", ".company", ".life", ".ltd", ".media", ".salon", ".run", ".co", ".us", ".name", ".tv", ".pro", ".mobi", ".ist", ".cc", ".biz", ".bbs.tr", ".dr.tr", ".gg", ".me"]
   /*var regex = new RegExp(
    "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
  );*/
   let mesajj = [
    `${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın mesajının düzenleyerek link atması?`,
    `${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Link Engel Filtresi aktif! Bu yüzden mesajını düzenleyerek link atamazsın!`,
    `${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek link atamazsın!`,
    `${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek link atamazsın!`
  ]
    let mesaj = Math.floor((Math.random() * mesajj.length));
    if (link.some(word => newMessage.content.includes(word)) === true) {
          if (!oldMessage.mentions.users.first()) {
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

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Link Atmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_link`, +1)
			      newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({dynamic: true}))
            return newMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);
          }
      }
  }

  if(!linkk) return;
})
//Link Engel

//Reklam Engel

client.on('message', async message => {
  if (!message.guild) return;
  const veri = db.fetch(`reklamK_${message.guild.id}`)
  if (!veri) return;
  if (veri === "aktif") {
      const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (swearWords.some(word => message.content.includes(word))) {
          try {
              if (!message.member.hasPermission("MANAGE_MESSAGES")) {
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

            db.push(`uyarı_${message.author.id}_${message.guild.id}`, { kullanıcı: message.author.id, sebep: "Reklam Yapmak", sunucu: message.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_reklam`, +1)
                let mesajj = [
                  `${message.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın reklam yapması?`,
                  `${message.author}, Seni gidi terbiyesiz seni! Bu sunucuda Reklam Engel Filtresi aktif! Bu yüzden reklam yapamazsın!`,
                  `${message.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden reklam yapamazsın!`,
                  `${message.author}, Hop! Terbiyeni koru! bu sunucuda reklam yapamazsın!`
                ]
                let mesaj = Math.floor((Math.random() * mesajj.length));
                message.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}))
            return message.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);  
                        }
          } catch(error) {
              console.log(error);
          }
      }
  }
})

client.on('messageUpdate', async (newMessage, oldMessage) => {
  if (!oldMessage.guild) return;
  const veri = db.fetch(`reklamK_${oldMessage.guild.id}`)
  if (!veri) return;
  if (veri === "aktif") {
      const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (swearWords.some(word => newMessage.content.includes(word))) {
          try {
              if (!oldMessage.member.hasPermission("MANAGE_MESSAGES")) {
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

            db.push(`uyarı_${oldMessage.author.id}_${oldMessage.guild.id}`, { kullanıcı: oldMessage.author.id, sebep: "Mesajını Düzenleyerek Reklam Yapmak", sunucu: oldMessage.guild.id, moderator: client.user.id, uyarısayı: id})
            db.add(`günlük_reklam`, +1)
                let mesajj = [
                  `${oldMessage.author}, Hop! Seni gidi terbiyesiz seni! yakışıyor mu senin gibi iyi bir insanın mesajını düzenleyerek reklam yapması?`,
                  `${oldMessage.author}, Seni gidi terbiyesiz seni! Bu sunucuda Mesajını Düzenleyerek Reklam Engel Filtresi aktif! Bu yüzden reklam yapamazsın!`,
                  `${oldMessage.author}, Pü Pü Pü! Bu sunucuyu ben koruyorum bu yüzden mesajını düzenleyerek reklam yapamazsın!`,
                  `${oldMessage.author}, Hop! Terbiyeni koru! bu sunucuda mesajını düzenleyerek reklam yapamazsın!`
                ]
                let mesaj = Math.floor((Math.random() * mesajj.length));
                newMessage.delete();
            const embed1 = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({dynamic: true}))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`${mesajj[mesaj]}`)
            .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({dynamic: true}))
            return oldMessage.channel.send(embed1).then(msg => {msg.delete({ timeout: 5000 })}).catch(console.error);  
                        }
          } catch(error) {
              console.log(error);
          }
      }
  }
})
//Reklam Engel 

const AntiSpam = require("./spam.js");
const { link } = require("node-superfetch");

client.on("message", async message => {
  if(!message.member) return;
  if(!message.guild) return;
  if (!message.member.hasPermission('ADMINISTRATOR')) {
      if(!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return;
     let spam = await db.fetch(`spamEngel_${message.guild.id}`) 
     if(!spam) return;
     AntiSpam(client, message);
    }
});

client.on('guildMemberAdd', async member => {
  let spam = await db.fetch(`spamvar_${member.guild.id}`)
let muteRole = db.fetch(`muteRole_${member.guild.id}`)
  if(spam === member.id){
        setTimeout(() => {
        member.roles.cache.forEach(s => {
      member.roles.remove(s)
    })
              member.roles.add(muteRole)
        }, 3000)
        setTimeout(() => {
              member.roles.remove(muteRole)
          db.delete(`spamvar_${member.guild.id}`)
          member.guild.roles.cache.forEach(async r => {
const i = await db.fetch(`${member.guild.id}.spam.${member.id}.roles.${r.id}` )
if(i != r.id)  return;
if(i){
  member.roles.add(i)
}
})

  }, 600000)  

  }
}) 

client.on("messageDelete", async(message) => {
  if(message.author.bot) return;
  if(message.author.id === client.user.id) return;
  let kanall = db.fetch(`modlog_${message.guild.id}`)
  let kanal = message.guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return;
  const charCheck = (str, max = 1024) => (str.length > max) ? str.slice(0, max - 3) + "..." : str;
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`
  • | Bir Mesaj Silindi!
  `)
  .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${message.author.tag}**\n> • | ID: **${message.author.id}**`)
  .addField("Mesaj İçeriği", "```" + charCheck(message.content) + "```")
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  return kanal.send(embed)

})

client.on("messageUpdate", async(oldMessage, newMessage) => {

  if(oldMessage.author.bot) return;
  if(oldMessage.author.id === client.user.id) return;
  let kanall = db.fetch(`modlog_${oldMessage.guild.id}`)
  let kanal = oldMessage.guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return;
  if(oldMessage.content === newMessage.content) return;

  const charCheck = (str, max = 1024) => (str.length > max) ? str.slice(0, max - 3) + "..." : str;
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, oldMessage.author.avatarURL({ dynamic: true }))
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`
  • | Bir Mesaj Güncellendi!
  `)
  .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${oldMessage.author.tag}**\n> • | ID: **${oldMessage.author.id}**`)
  .addField("Eski Mesaj İçeriği", "```" + charCheck(oldMessage.content) + "```")
  .addField("Yeni Mesaj İçeriği", "```" + charCheck(newMessage.content) + "```")
  .setFooter(client.ayarlar.embedFooter, oldMessage.author.avatarURL({ dynamic: true }))
  return kanal.send(embed)
})  

client.on("guildMemberAdd", async(member) => {
  let kanall = db.fetch(`modlog_${member.guild.id}`)
  let kanal = member.guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return;
 var kişi = member.user
 var tarih = ''
            if(moment(kişi.createdAt).format('MM') === '01') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '02') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '03') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '04') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '05') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '06') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '07') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '08') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '09') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '10') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '11') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '12') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`
  • | Bir Üye Katıldı!
  `)
  .addField(":white_small_square: | Üye Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**\n> • | Hesap Oluşturulma Tarihi: **${tarih}**`)
   
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  return kanal.send(embed)
})

client.on("guildMemberRemove", async(member) => {
  let kanall = db.fetch(`modlog_${member.guild.id}`)
  let kanal = member.guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return;
 var kişi = member.user
 var tarih = ''
            if(moment(kişi.createdAt).format('MM') === '01') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '02') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '03') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '04') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '05') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '06') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '07') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '08') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '09') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '10') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '11') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '12') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
  .setColor(client.ayarlar.embedRenk)
  .setDescription(`
  • | Bir Üye Ayrıldı!
  `)
  .addField(":white_small_square: | Üye Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**\n> • | Hesap Oluşturulma Tarihi: **${tarih}**`)
   
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  return kanal.send(embed)
})

client.on("channelCreate", async(channel) => {
  let guild = channel.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let görünebilirmi;
  if(channel.viewable === true) {
    görünebilirmi = "Evet"
  } else {
    görünebilirmi = "Hayır"
  }

  let member = await guild.fetchAuditLogs({type: "CHANNEL_CREATE"}).then(sa => sa.entries.first())

  if(channel.type === "text") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Yazı**\n> • | Kanal Pozisyonu: **${channel.position}**\n> • | Kanal Görünebilir mi?: **${görünebilirmi}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "voice") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Sesli**\n> • | Kanal Pozisyonu: **${channel.position}**\n> • | Kanal Görünebilir mi?: **${görünebilirmi}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "category") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Kategori**\n> • | Kanal Pozisyonu: **${channel.position}**\n> • | Kanal Görünebilir mi?: **${görünebilirmi}**`)
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "news") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Duyuru**\n> • | Kanal Pozisyonu: **${channel.position}**\n> • | Kanal Görünebilir mi?: **${görünebilirmi}**`)
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "store") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Mağaza**\n> • | Kanal Pozisyonu: **${channel.position}**\n> • | Kanal Görünebilir mi?: **${görünebilirmi}**`)
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  }

})

client.on("channelDelete", async(channel) => {
  let guild = channel.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let member = await guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(sa => sa.entries.first())

  if(channel.type === "text") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Yazı**\n> • | Kanal Pozisyonu: **${channel.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "voice") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Sesli**\n> • | Kanal Pozisyonu: **${channel.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "category") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Kategori**\n> • | Kanal Pozisyonu: **${channel.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "news") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Duyuru**\n> • | Kanal Pozisyonu: **${channel.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  } else if(channel.type === "store") {
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Kanal Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Kanal Bilgileri", `> • | Adı: **${channel.name}**\n> • | ID: **${channel.id}**\n> • | Kanal Tipi: **Mağaza**\n> • | Kanal Pozisyonu: **${channel.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  }

})

client.on("roleCreate", async(role) => {
  let guild = role.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let member = await guild.fetchAuditLogs({type: "ROLE_CREATE"}).then(sa => sa.entries.first())
  let etiketlenebilirmi;
  if(role.mentionable === true) {
    etiketlenebilirmi = "Evet"
  } else {
    etiketlenebilirmi = "Hayır"
  }
    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Rol Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Rol Bilgileri", `> • | Adı: **${role.name}**\n> • | ID: **${role.id}**\n> • | Rol Rengi: **${role.hexColor}**\n> • | Rol Pozisyonu: **${role.position}**\n> • | Etiketlenebilirmi?: **${etiketlenebilirmi}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  
})

client.on("roleDelete", async(role) => {
  let guild = role.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let member = await guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(sa => sa.entries.first())

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Rol Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Rol Bilgileri", `> • | Adı: **${role.name}**\n> • | ID: **${role.id}**\n> • | Rol Rengi: **${role.hexColor}**\n> • | Rol Pozisyonu: **${role.position}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  
})

client.on("emojiCreate", async(emoji) => {
  let guild = emoji.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let member = await guild.fetchAuditLogs({type: "EMOJI_CREATE"}).then(sa => sa.entries.first())

  let hareketlimi;
  if(emoji.animated === true) {
    hareketlimi = "Evet"
  } else {
    hareketlimi = "Hayır"
  }

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Emoji Oluşturuldu!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Emoji Bilgileri", `> • | Adı: **${emoji.name}**\n> • | ID: **${emoji.id}**\n> • | Bağlantı: **[Tıkla](${emoji.url})**\n> • | Hareketlimi: **${hareketlimi}**`)
     
    .setImage(emoji.url)
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  
})

client.on("emojiDelete", async(emoji) => {
  let guild = emoji.guild;
  let kanall = db.fetch(`modlog_${guild.id}`)
  let kanal = guild.channels.cache.get(kanall)
  if(!kanal) return;
  if(!kanall) return; 

  let member = await guild.fetchAuditLogs({type: "EMOJI_DELETE"}).then(sa => sa.entries.first())

    const embed = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, client.user.avatarURL())
    .setColor(client.ayarlar.embedRenk)
    .setDescription(`
    • | Bir Emoji Silindi!
    `)
    .addField(":white_small_square: | Kişi Bilgileri", `> • | Adı: **${member.user.tag}**\n> • | ID: **${member.id}**`)
    .addField(":white_small_square: | Emoji Bilgileri", `> • | Adı: **${emoji.name}**\n> • | ID: **${emoji.id}**`)
     
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    return kanal.send(embed)
  
})

client.on("guildMemberAdd", async(member) => {
  let guild = member.guild;
  let kanal = guild.channels.cache.get(db.fetch(`kayıtkanal_${guild.id}`))
  let tag = db.fetch(`kayıttag_${guild.id}`)
  let yetkili = db.fetch(`kayıtyetkilirol_${guild.id}`)
  let mesaj = db.fetch(`kayıtmesaj_${guild.id}`)
  let embedResim = ["https://tenor.com/view/thor-avenger-chris-hemsworth-mjolnir-gif-13624915", "https://tenor.com/view/thor-fat-mjolnir-stormbreaker-avengers-gif-14029215", "https://tenor.com/view/band-of-brother-run-soldiers-hurry-ww2-gif-5408691", "https://tenor.com/view/captain-america-avengers-infinity-war-marvel-badass-gif-10388170", "https://tenor.com/view/thanos-avengers-infinity-war-mind-stone-last-stone-infinity-gauntlet-gif-15735729", "https://tenor.com/view/deep-turkish-web-hosgeldin-hos-geldiniz-hosgeldiniz-beyefendi-gif-18244346", "https://tenor.com/view/welcometrump-trumpwelcome-thumbs-up-gif-12122103", "https://media.giphy.com/media/5wFGrglelyPDUPWMEO/giphy.gif", "https://media.giphy.com/media/XJzqSm5fdWnU2qImwI/giphy.gif", "https://media.giphy.com/media/Qxe0Hi0OgAlJT5yEfs/giphy.gif", "https://media.giphy.com/media/YO5e7gmuBuwFygt3g9/giphy.gif", "https://media.giphy.com/media/npszbmF6GwHSw/giphy.gif", "https://media.giphy.com/media/aqMY57vLdkghi/giphy.gif", "https://media.giphy.com/media/5QLvhxl4JXWDtP4iW4/giphy.gif", "https://media.giphy.com/media/9tZc9Mzo9K0yOYx38U/giphy.gif", "https://media.giphy.com/media/8xomIW1DRelmo/giphy.gif", "https://media.giphy.com/media/rj12FejFUysTK/giphy.gif", "https://media.giphy.com/media/Ajyi28ZdneUz6/giphy.gif"]
  let embedResimler = Math.floor(Math.random() * embedResim.length)

  let embedFooter;
  if(db.fetch(`kayıtembedfooter_${guild.id}`)) {
    embedFooter = db.fetch(`kayıtembedfooter_${guild.id}`)
  } else {
    embedFooter = client.ayarlar.embedFooter
  }

  let embedRenk;
  if(db.fetch(`kayıtembedrenk_${guild.id}`)) {
    embedRenk = db.fetch(`kayıtembedrenk_${guild.id}`)
  } else {
    embedRenk = client.ayarlar.embedRenk
  }

  let embedAuthor;
  if(db.fetch(`kayıtembedauthor_${guild.id}`)) {
    embedAuthor = db.fetch(`kayıtembedauthor_${guild.id}`)
  } else {
    embedAuthor = `${client.ayarlar.botİsim} Bot`
  }
 
  let embedİmage;
  if(db.fetch(`kayıtembedimage_${guild.id}`)) {
    embedİmage = db.fetch(`kayıtembedimage_${guild.id}`)
  } else {
    embedİmage = embedResim[embedResimler]
  }


  if(!kanal) return;
  if(!tag) return;
  if(!yetkili) return;
  let kontrol;
  if(member.user.createdAt > 604800000) kontrol = "Güvenilir"
  if(member.user.createdAt < 604800000) kontrol = "Güvenilir Değil"
  
  var kişi = member.user
  var tarih = ''
            if(moment(kişi.createdAt).format('MM') === '01') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ocak ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '02') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Şubat ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '03') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mart ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '04') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Nisan ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '05') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Mayıs ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '06') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Haziran ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '07') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Temmuz ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '08') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ağustos ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '09') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Eylül ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '10') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Ekim ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '11') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Kasım ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }
            if(moment(kişi.createdAt).format('MM') === '12') {
                var tarih = `${moment(kişi.createdAt).format('DD')} Aralık ${moment(kişi.createdAt).format('YYYY HH:mm:ss')} `
            }


  if(!mesaj) {
  const embed = new Discord.MessageEmbed()
  .setAuthor(embedAuthor, client.user.avatarURL())
  .setColor(embedRenk)
  .setDescription(`
  <a:giris:699630839570628689> Sunucumuza Hoş Geldin, ${member} !
  <:uyeler:788834534820544586> Senin sayende **${guild.memberCount}** Üye olduk!
  <a:kullanici:757255074388115506> Hesabın **${tarih}** Tarihinde kurulmuş!
  <:koruma:776477913838911578> Bu Kullanıcı **${kontrol}**!
  <:destek:775821309505568788> <@&${yetkili}> Rolündeki yetkililer senin ile ilgilenecektir!
  `)
  .setImage(embedİmage)
  .setFooter(embedFooter, client.user.avatarURL())
  return kanal.send(embed)
  } else {
    let mesajj = mesaj
    .replace("{kullanıcı}", member)
    .replace("{kullanıcı-id}", member.id)
    .replace("{kullanıcı-isim}", member.user.tag)
    .replace("{erkek-verilecek-rol}", "<@&" + db.fetch(`kayıterkekrol_${guild.id}`) + ">" || "???")
    .replace("{erkek-verilecek-rol-id}", db.fetch(`kayıterkekrol_${guild.id}`) || "???")
    .replace("{erkek-verilecek-rol-isim}", guild.roles.cache.get(db.fetch(`kayıterkekrol_${guild.id}`)).name || "???")
    .replace("{kız-verilecek-rol}", "<@&" + db.fetch(`kayıtkızrol_${guild.id}`) + ">" || "???")
    .replace("{kız-verilecek-rol-id}", db.fetch(`kayıtkızrol_${guild.id}`) || "???")
    .replace("{kız-verilecek-rol-isim}", guild.roles.cache.get(db.fetch(`kayıtkızrol_${guild.id}`)).name || "???")
    .replace("{alınacak-rol}", "<@&" + db.fetch(`kayıtalınacakrol_${guild.id}`) + ">" || "???")
    .replace("{alınacak-rol-id}", db.fetch(`kayıtalınacakrol_${guild.id}`) || "???")
    .replace("{alınacak-rol-isim}", guild.roles.cache.get(db.fetch(`kayıtalınacakrol_${guild.id}`)).name || "???")
    .replace("{yetkili-rol}", "<@&" + db.fetch(`kayıtyetkilirol_${guild.id}`) + ">" || "???")
    .replace("{yetkili-rol-id}", db.fetch(`kayıtyetkilirol_${guild.id}`) || "???")
    .replace("{yetkili-rol-isim}", guild.roles.cache.get(db.fetch(`kayıtyetkilirol_${guild.id}`)).name || "???")

    const embed = new Discord.MessageEmbed()
  .setAuthor(embedAuthor, client.user.avatarURL())
  .setColor(embedRenk)
  .setDescription(`
  **${mesajj}**
  `)
  .setImage(embedİmage)
  .setFooter(embedFooter, client.user.avatarURL())
  return kanal.send(embed)
  }

})
 
client.login(client.ayarlar.token)