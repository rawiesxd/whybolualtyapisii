const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args, prefix) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)

    dbl.hasVoted(message.author.id).then(voted => {
      if(voted === true) {
        if(message.author.id !== message.guild.ownerID) return message.channel.send("Bu komutu kullanabilmek için sunucu sahibi olman gerekli!") 
		if(!message.guild.members.cache.get(client.user.id).hasPermission("ADMINISTRATOR")) return message.channel.send(`${exports.help.name} Adlı komutu çalıştırabilmem için \`YÖNETİCİ\` yetkisine ihtiyacım var!`)
        if(!args[0]) {
          const embed = new Discord.MessageEmbed()
          .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
          .setColor(client.ayarlar.embedRenk)
          .setDescription(`
          Selam ${message.author}, Eğer sunucu kurmak istiyorsan bir değer belirt!
          
          > • | **${prefix}sunucukur normal**
          > • | **${prefix}sunucukur youtuber**
          > • | **${prefix}sunucukur kod**
          > • | **${prefix}sunucukur destek**
          > • | **${prefix}sunucukur gif**
          > • | **${prefix}sunucukur botlist**
          > • | **${prefix}sunucukur tasarım**
          > • | **${prefix}sunucukur hosting**
          > • | **${prefix}sunucukur public**
          `)
          .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
          return message.channel.send(embed)
        }
      
        if(args[0] === 'normal') {
           const embed = new Discord.MessageEmbed()
           .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
           .setColor(client.ayarlar.embedRenk)
           .setDescription(`
           Selam sayın ${message.author}, Eğer **Normal Sunucu** Kurulumu yapmak istiyorsanız **evet** yazın, iptal edilmesini istiyorsanız 10 saniye bekleyin.
           `)
           .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
           return message.channel.send(embed).then(normal => {
            message.channel.awaitMessages(response => response.content === 'evet', {
              max: 1,
              time: 10000,
              errors: ['time'],
            }).then(async (_collected) => {
				setTimeout(async () => {
				message.guild.channels.cache.forEach((kanal) => {
                kanal.delete()
            })
              message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach((roles) => {
                roles.delete();
			});	
			}, 10000)
					
               
              let every = message.guild.roles.cache.find(r => r.name === '@everyone')
				setTimeout(() => {
              message.guild.channels.create('📗 》 Önemli', {type:"category"}).then(bilgi => {
                message.guild.channels.create('👥 》 Toplum', {type:"category"}).then(toplum => {
                message.guild.channels.create('📞 》 Sesli Odalar', {type:"category"}).then(sesli => {
                message.guild.channels.create("🚪 》 Loglar", {type:"category"}).then(loglar => {
                db.set(`küfürE_${message.guild.id}`, "aktif")
                db.set(`linkK_${message.guild.id}`, "aktif")
                db.set(`reklamK_${message.guild.id}`, "aktif")
                db.set(`spamEngel_${message.guild.id}`, "açık")
                
            
                //Kanallar
                 
                  message.guild.channels.create('📙・kurallar', {type:"text"}).then(kurallar => {
                    kurallar.createOverwrite(every, {
                      SEND_MESSAGES: false,
                      VIEW_CHANNEL: true,
                      MENTION_EVERYONE: false
                    })
                    
                  kurallar.setParent(bilgi.id)
                const kurallarembed = new Discord.MessageEmbed()
                .setColor(client.ayarlar.embedRenk)
                .setAuthor(`${message.guild.name} Kurallar Kanalı`, client.user.avatarURL())
                .addField("Kurallar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Herhangi bir kişiye küfretmek, kışkırtmak, kötü sözde bulunmak yasaktır!\n • Sohbet kanallarında botların komutlarını kullanmak yasaktır!\n• Sohbet kanallarında spam atmak yasaktır.\n • Herhangi bir yetkiliye küfretmek yasaktır.\n• Destek kanalı dışında bir kanaldan destek istemek yasaktır.\n• Din/Dil/Irk ayrımı yapmak yasaktır tüm insanlar eşittir!\n• Sesli odalarda bass açıp küfretmek yasaktır\n• Boş yere destek kanalında yetkilileri oylamak yasaktır!`)
                .setThumbnail(client.user.avatarURL())
                .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
                kurallar.send(kurallarembed)  
              })
            
                  message.guild.channels.create('📢・duyurular', {type:"text"}).then(duyurular => {
                    const duyuruembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Duyurular Kanalı`, client.user.avatarURL())
              .addField("Duyurular Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} Tarafından yapılan duyuruları göreceksiniz!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              duyurular.send(duyuruembed)
                
              duyurular.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
                    
                    
                  duyurular.setParent(bilgi.id)
                })
                 
             message.guild.channels.create('💎・boost', {type:"text"}).then(boost => {
               const boostembed = new Discord.MessageEmbed()
               .setColor(client.ayarlar.embedRenk)
               .setAuthor(`${message.guild.name} Boost Kanalı`, client.user.avatarURL())
               .addField("Boost Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Eğer **${message.guild.name}** Adlı Sunucuya Boost Basarsanız Bazı Özellikler Kazanıcaksınız!`)
               .addField("Boost Özellikleri;", `• Profilinizde Özel Booster Rozeti (<a:boost:767781666604318780>)\n• Sunucu içerisinde size özel rol! (**Server Booster**)\n• Boosterlar Özel Sesli ve Yazılı Kanal\n• ve daha fazlası! boost basarak bir çok ödülü kazanabilirsiniz!`)
               .setThumbnail(client.user.avatarURL())
               .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
               boost.send(boostembed)
            
               boost.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
             
             
            boost.setParent(bilgi.id)
            })
            
            message.guild.channels.create('👤・partner', {type:"text"}).then(partner => {
              const partnerembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Partner Kanalı`, client.user.avatarURL())
              .addField("Partner Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Eğer **${message.guild.name}** Adlı Sunucuyla Partner Yapmak İstiyorsanız ${message.guild.owner} ile görüşün!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              partner.send(partnerembed)
            
              partner.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
             
             
            partner.setParent(bilgi.id)
            })
            
                  message.guild.channels.create('💬・sohbet', {type:"text"}).then(sohbet => {
                  sohbet.setParent(toplum.id)
                  const sohbetembed = new Discord.MessageEmbed()
                  .setColor(client.ayarlar.embedRenk)
                  .setAuthor(`${message.guild.name} Sohbet Kanalı`, client.user.avatarURL())
                  .addField("Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası sohbet, Burdan arkadaşlarınla vb sohbet etmek için kuruldu. Uygunsuz konuşmalara izinli değildir. [Not:  Küfür link reklam ve capslock engel otomatikmen aktifleştirilmiştir!]`)
                  .setThumbnail(client.user.avatarURL())
                  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
                  sohbet.send(sohbetembed)
                    
                  sohbet.createOverwrite(every,{
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    MENTION_EVERYONE: false
                    })
                })
            
                message.guild.channels.create('🤖・bot-komut', {type:"text"}).then(komutlar => {
                  const komutlarembed = new Discord.MessageEmbed()
                  .setColor(client.ayarlar.embedRenk)
                  .setAuthor(`${message.guild.name} Bot Komut Kanalı`, client.user.avatarURL())
                  .addField("Bot Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Bot Komut, Bu kanal sayesinde sunucuda bulunan botları kullanabilirsin, örnek beni :)`)
                  .setThumbnail(client.user.avatarURL())
                  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
                  komutlar.send(komutlarembed)
            
             komutlar.setParent(toplum.id)
                
             komutlar.createOverwrite(every,{
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              MENTION_EVERYONE: false
              })
            })
            
            message.guild.channels.create('📷・galeri', {type:"text"}).then(galeri => {
              const galeriembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Galeri Kanalı`, client.user.avatarURL())
              .addField("Galeri Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Galeri, Bu kanal sayesinde resimler atabilirsin! (sunucunun güvenliği için lütfen +18 resimler atmayınız!)`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              galeri.send(galeriembed)
            
              galeri.setParent(toplum.id)
            
            galeri.createOverwrite(every,{
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              MENTION_EVERYONE: false
              })
            })
            
            message.guild.channels.create('🚪・gelen-giden', {type:"text"}).then(gelengiden => {
              const gelengidenembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Gelen Giden Kanalı`, client.user.avatarURL())
              .addField("Gelen Giden Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Gelen Giden, Bu kanalda sunucuya giren üyeleri görebilirsiniz!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              gelengiden.send(gelengidenembed)
            
              db.set(`giriscikis_${message.guild.id}`, gelengiden.id)
            
              gelengiden.setParent(loglar.id)
            
              gelengiden.createOverwrite(every, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            MENTION_EVERYONE: false
            })
            })
            
            message.guild.channels.create('🚪・mod-log', {type:"text"}).then(modlog => {
              const modlogembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Moderasyon Log Kanalı`, client.user.avatarURL())
              .addField("Gelen Giden Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Moderasyon Log, Bu kanalda sunucu içerisinde yapılan moderasyon işlemleri görüntülenecektir!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              modlog.send(modlogembed)
            
              db.set(`modlog_${message.guild.id}`, modlog.id)
            
              modlog.setParent(loglar.id)
            
              modlog.createOverwrite(every, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            MENTION_EVERYONE: false
            })
            })
            
            message.guild.channels.create('🚪・sayaç', {type:"text"}).then(sayaç => {
              const sayaçembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Sayaç Kanalı`, client.user.avatarURL())
              .addField("Sayaç Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Sayaç, Bu kanalda sunucuya giren üyeler sayılacaktır!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              sayaç.send(sayaçembed)
            
              db.set(`sayaçH_${message.guild.id}`, 1000)
              db.set(`sayaçK_${message.guild.id}`, sayaç.id)
            
              sayaç.setParent(loglar.id)
            
              sayaç.createOverwrite(every, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            MENTION_EVERYONE: false
            })
            })
            
            message.guild.channels.create('🚪・otorol', {type:"text"}).then(otorol => {
              const otorolembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Otorol Kanalı`, client.user.avatarURL())
              .addField("Otorol Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Otorol, Bu kanalda sunucuya giren üyelere rol verilecektir!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              otorol.send(otorolembed)
            
              db.set(`otorolK_${message.guild.id}`, otorol.id)
            
              otorol.setParent(loglar.id)
            
              otorol.createOverwrite(every, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            MENTION_EVERYONE: false
            })
            })
            
            message.guild.channels.create('🚪・güvenlik', {type:"text"}).then(güvenlik => {
              const güvenlikembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Güvenlik Kanalı`, client.user.avatarURL())
              .addField("Otorol Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Güvenlik, Bu kanalda sunucuya giren üyeleri resimli bir şekilde göreceksiniz!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              güvenlik.send(güvenlikembed)
            
              db.set(`guvenlik_${message.guild.id}`, güvenlik.id)
            
              güvenlik.setParent(loglar.id)
            
              güvenlik.createOverwrite(every, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: false,
            MENTION_EVERYONE: false
            })
            })
                        
                 
                setTimeout(() => {
                  message.guild.channels.create('☕・Çay İçme', {type:"voice"}).then(muzık => {
                    muzık.createOverwrite(every, {
                    VIEW_CHANNEL: true,
                    CONNECT: true
                  })
                    muzık.setParent(sesli.id)
                  })
            
                  message.guild.channels.create('☕・Kahve İçme', {type:"voice"}).then(muzık => {
                    muzık.createOverwrite(every, {
                    VIEW_CHANNEL: true,
                    CONNECT: true
                  })
                    muzık.setParent(sesli.id)
                  })
            
                  message.guild.channels.create('📞・Genel Sohbet', {type:"voice"}).then(muzık => {
                    muzık.createOverwrite(every, {
                    VIEW_CHANNEL: true,
                    CONNECT: true
                  })
                    muzık.setParent(sesli.id)
                  })
            
                  message.guild.channels.create('🎵・Müzik Odası', {type:"voice"}).then(muzık => {
                    muzık.createOverwrite(every, {
                    VIEW_CHANNEL: true,
                    CONNECT: true
                  })
                    muzık.setParent(sesli.id)
                  })
            
                }, 10000)
            
                })})})})
                  
                setTimeout(() => {
                  message.guild.roles.create({
                    data: {
                    name: '👑・Kurucu',
                    color: '#ffdf00',
                    permissions: [
                      
                        "ADMINISTRATOR",
                ],
                hoist: true
                    }
                  }).then(d =>  message.guild.owner.roles.add(d.id))
                  message.guild.roles.create({
                    data: {
                      name: '⚒・Üst Yetkili',
                      color: '#67d714',
                      permissions: [
                          "MANAGE_GUILD",
                          "MANAGE_ROLES",
                          "MUTE_MEMBERS",
                          "DEAFEN_MEMBERS",
                          "MANAGE_MESSAGES",
                          "MANAGE_NICKNAMES",
                          "KICK_MEMBERS"
                  ],
                  hoist: true
                    }
                  })
                  message.guild.roles.create({
                    data: {
                      name: '⚒・Moderatör',
                      color: '#00fc5f',
                      permissions: [
                        "MANAGE_GUILD",
                        "MANAGE_ROLES",
                        "MUTE_MEMBERS",
                        "DEAFEN_MEMBERS",
                        "MANAGE_MESSAGES",
                        "MANAGE_NICKNAMES"
                ],
                hoist: true
                      }
                  })
                  message.guild.roles.create({
                    data: {
                      name: '💥・Vip',
                      color: '#00c7ff',
                      hoist: true,
                      }
                  })
                
                  message.guild.roles.create({
                    data: {
                    name: '👥・Cezalı Üye',
                    color: '8e8e72',
                    hoist: true,
                      }
                  }).then(rol =>  db.set(`muteRole_${message.guild.id}`, rol.id))
            
                  message.guild.roles.create({
                    data: {
                    name: '👥・Üye',
                    color: '#ff8000',
                    hoist: true,
                    }
                  }).then(d =>  db.set(`otorolR_${message.guild.id}`, d.id,  message.guild.members.cache.filter(s => !s.user.bot).forEach(s => s.roles.add(d.id))))
             
             message.guild.roles.create({
              data: {
                name: '🤖・Bot',
                color: '#a200ff',
                hoist: true,
              }
                  }).then(bot => message.guild.members.cache.filter(s => s.user.bot).forEach(s => s.roles.add(bot.id)))
                }, 20000)
            }, 20000)
           })
		   })
  } else {
      var arg = args[0]
      }
      
      
      if(!args[0]) {var arg = args[0]}
      
      
      if(!args[0]) {var arg = args[0]} 
      
      if(args[0] === 'youtuber') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Selam sayın ${message.author}, Eğer **YouTuber Sunucu** Kurulumu yapmak istiyorsanız **evet** yazın, iptal edilmesini istiyorsanız 10 saniye bekleyin.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed).then(normal => {
         message.channel.awaitMessages(response => response.content === 'evet', {
           max: 1,
           time: 10000,
           errors: ['time'],
         }).then(async (_collected) => {
			 setTimeout(async () => {
				message.guild.channels.cache.forEach((kanal) => {
                 kanal.delete()
               })
                message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach((roles) => {
                 roles.delete();
               }); 
			 }, 10000)
				
            
      
           let every = message.guild.roles.cache.find(r => r.name === '@everyone')
		   setTimeout(() => {
			   message.guild.channels.create('❮🚨❯ Bilgilendirme ❮🚨❯', {type:"category"}).then(bilgi => {
             message.guild.channels.create('❮💬❯ Genel ❮💬❯', {type:"category"}).then(toplum => {
             message.guild.channels.create('❮🔊❯ Sesli Kanallar ❮🔊❯', {type:"category"}).then(sesli => {
             message.guild.channels.create("❮⚡❯ Yetkili ❮⚡❯", {type:"category"}).then(yetkili => {
            message.guild.channels.create("❮🚪❯ Log ❮🚪❯", { type: "category" }).then(loglar => {
             db.set(`küfürE_${message.guild.id}`, "aktif")
             db.set(`linkK_${message.guild.id}`, "aktif")
             db.set(`reklamK_${message.guild.id}`, "aktif")
             db.set(`spamEngel_${message.guild.id}`, "açık")
             
         
             //Kanallar
               message.guild.channels.create('📜︙kurallar', {type:"text"}).then(kurallar => {
                 kurallar.createOverwrite(every, {
                   SEND_MESSAGES: false,
                   VIEW_CHANNEL: true,
                   MENTION_EVERYONE: false
                 })
                 
               kurallar.setParent(bilgi.id)
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Kurallar Kanalı`, client.user.avatarURL())
             .addField("Kurallar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Herhangi bir kişiye küfretmek, kışkırtmak, kötü sözde bulunmak yasaktır!\n • Sohbet kanallarında botların komutlarını kullanmak yasaktır!\n• Sohbet kanallarında spam atmak yasaktır.\n • Herhangi bir yetkiliye küfretmek yasaktır.\n• Destek kanalı dışında bir kanaldan destek istemek yasaktır.\n• Din/Dil/Irk ayrımı yapmak yasaktır tüm insanlar eşittir!\n• Sesli odalarda bass açıp küfretmek yasaktır\n• Boş yere destek kanalında yetkilileri oylamak yasaktır!`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             kurallar.send(kurallarembed)  
           })
         
               message.guild.channels.create('📢︙duyurular', {type:"text"}).then(duyurular => {
                 const duyuruembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Duyurular Kanalı`, client.user.avatarURL())
           .addField("Duyurular Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} Tarafından yapılan duyuruları göreceksiniz!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           duyurular.send(duyuruembed)
             
           duyurular.createOverwrite(every, {
             SEND_MESSAGES: false,
             VIEW_CHANNEL: true,
             MENTION_EVERYONE: false
           })
                 
                 
               duyurular.setParent(bilgi.id)
             })
                
               message.guild.channels.create('🌍︙genel-sohbet', {type:"text"}).then(sohbet => {
               sohbet.setParent(toplum.id)
               const sohbetembed = new Discord.MessageEmbed()
               .setColor(client.ayarlar.embedRenk)
               .setAuthor(`${message.guild.name} Sohbet Kanalı`, client.user.avatarURL())
               .addField("Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası sohbet, Burdan arkadaşlarınla vb sohbet etmek için kuruldu. Uygunsuz konuşmalara izinli değildir. [Not:  Küfür link reklam ve capslock engel otomatikmen aktifleştirilmiştir!]`)
               .setThumbnail(client.user.avatarURL())
               .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
               sohbet.send(sohbetembed)
                 
               sohbet.createOverwrite(every,{
                 VIEW_CHANNEL: true,
                 SEND_MESSAGES: true,
                 MENTION_EVERYONE: false
                 })
             })
      
             message.guild.channels.create('🎨︙görsel', {type:"text"}).then(galeri => {
              const galeriembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Galeri Kanalı`, client.user.avatarURL())
              .addField("Galeri Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Galeri, Bu kanal sayesinde resimler atabilirsin! (sunucunun güvenliği için lütfen +18 resimler atmayınız!)`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              galeri.send(galeriembed)
            
              galeri.setParent(toplum.id)
            
            galeri.createOverwrite(every,{
              VIEW_CHANNEL: true,
              SEND_MESSAGES: true,
              MENTION_EVERYONE: false
              })
            })
         
             message.guild.channels.create('❗︙komut-kullanma', {type:"text"}).then(komutlar => {
               const komutlarembed = new Discord.MessageEmbed()
               .setColor(client.ayarlar.embedRenk)
               .setAuthor(`${message.guild.name} Bot Komut Kanalı`, client.user.avatarURL())
               .addField("Bot Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Bot Komut, Bu kanal sayesinde sunucuda bulunan botları kullanabilirsin, örnek beni :)`)
               .setThumbnail(client.user.avatarURL())
               .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
               komutlar.send(komutlarembed)
         
          komutlar.setParent(toplum.id)
             
          komutlar.createOverwrite(every,{
           VIEW_CHANNEL: true,
           SEND_MESSAGES: true,
           MENTION_EVERYONE: false
           })
         })
      
         message.guild.channels.create('🎮︙oyuncu-arama', {type:"text"}).then(oyuncu => {
          const oyuncuembed = new Discord.MessageEmbed()
          .setColor(client.ayarlar.embedRenk)
          .setAuthor(`${message.guild.name} Oyuncu Arama Kanalı`, client.user.avatarURL())
          .addField("Oyuncu Arama Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Oyuncu Arama, Bu kanal sayesinde istediğiniz oyun için oyuncu bulabilirsiniz!`)
          .setThumbnail(client.user.avatarURL())
          .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
          oyuncu.send(oyuncuembed)
      
          oyuncu.setParent(toplum.id)
        
          oyuncu.createOverwrite(every,{
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      MENTION_EVERYONE: false
      })
      })
      
      message.guild.channels.create('📝︙ban-sebep', {type:"text"}).then(oyuncu => {
        const oyuncuembed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${message.guild.name} Ban Sebep Kanalı`, client.user.avatarURL())
        .addField("Ban Sebep Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Ban Sebep, Bu kanalda yasakladığınız kullanıcıların sebeplerini yazabilirsiniz.`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
        oyuncu.send(oyuncuembed)
      
        oyuncu.setParent(yetkili.id)
      
        oyuncu.createOverwrite(every,{
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      MENTION_EVERYONE: false
      })
      })
      
      message.guild.channels.create('🚨︙yetkili-sohbet', {type:"text"}).then(oyuncu => {
        const oyuncuembed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${message.guild.name} Yetkili Sohbet Kanalı`, client.user.avatarURL())
        .addField("Yetkili Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Yetkili Sohbet, Bu kanalda diğer yetkililer ile konuşabilirsiniz.`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
        oyuncu.send(oyuncuembed)
      
        oyuncu.setParent(yetkili.id)
      
        oyuncu.createOverwrite(every,{
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      MENTION_EVERYONE: false
      })
      })
      
      message.guild.channels.create("👮︙Moderasyon", { type: "voice" }).then(moderasyon => {
        moderasyon.setParent(yetkili.id)
      
        moderasyon.createOverwrite(every,{
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false,
      MENTION_EVERYONE: false
      })
      })
         
         
         
         message.guild.channels.create('🚪︙gelen-giden', {type:"text"}).then(gelengiden => {
           const gelengidenembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Gelen Giden Kanalı`, client.user.avatarURL())
           .addField("Gelen Giden Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Gelen Giden, Bu kanalda sunucuya giren üyeleri görebilirsiniz!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           gelengiden.send(gelengidenembed)
         
           db.set(`giriscikis_${message.guild.id}`, gelengiden.id)
         
           gelengiden.setParent(loglar.id)
         
           gelengiden.createOverwrite(every, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: false,
         MENTION_EVERYONE: false
         })
         })
         
         message.guild.channels.create('🚪︙mod-log', {type:"text"}).then(modlog => {
           const modlogembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Moderasyon Log Kanalı`, client.user.avatarURL())
           .addField("Gelen Giden Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Moderasyon Log, Bu kanalda sunucu içerisinde yapılan moderasyon işlemleri görüntülenecektir!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           modlog.send(modlogembed)
         
           db.set(`modlog_${message.guild.id}`, modlog.id)
         
           modlog.setParent(loglar.id)
         
           modlog.createOverwrite(every, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: false,
         MENTION_EVERYONE: false
         })
         })
         
         message.guild.channels.create('🚪︙sayaç', {type:"text"}).then(sayaç => {
           const sayaçembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Sayaç Kanalı`, client.user.avatarURL())
           .addField("Sayaç Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Sayaç, Bu kanalda sunucuya giren üyeler sayılacaktır!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           sayaç.send(sayaçembed)
         
           db.set(`sayaçH_${message.guild.id}`, 1000)
           db.set(`sayaçK_${message.guild.id}`, sayaç.id)
         
           sayaç.setParent(loglar.id)
         
           sayaç.createOverwrite(every, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: false,
         MENTION_EVERYONE: false
         })
         })
         
         message.guild.channels.create('🚪︙otorol', {type:"text"}).then(otorol => {
           const otorolembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Otorol Kanalı`, client.user.avatarURL())
           .addField("Otorol Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Otorol, Bu kanalda sunucuya giren üyelere rol verilecektir!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           otorol.send(otorolembed)
         
           db.set(`otorolK_${message.guild.id}`, otorol.id)
         
           otorol.setParent(loglar.id)
         
           otorol.createOverwrite(every, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: false,
         MENTION_EVERYONE: false
         })
         })
         
         message.guild.channels.create('🚪︙güvenlik', {type:"text"}).then(güvenlik => {
           const güvenlikembed = new Discord.MessageEmbed()
           .setColor(client.ayarlar.embedRenk)
           .setAuthor(`${message.guild.name} Güvenlik Kanalı`, client.user.avatarURL())
           .addField("Otorol Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Burası Güvenlik, Bu kanalda sunucuya giren üyeleri resimli bir şekilde göreceksiniz!`)
           .setThumbnail(client.user.avatarURL())
           .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
           güvenlik.send(güvenlikembed)
         
           db.set(`guvenlik_${message.guild.id}`, güvenlik.id)
         
           güvenlik.setParent(loglar.id)
         
           güvenlik.createOverwrite(every, {
         VIEW_CHANNEL: true,
         SEND_MESSAGES: false,
         MENTION_EVERYONE: false
         })
         })
                  
              
             setTimeout(() => {
               message.guild.channels.create('╰🍻 GENEL SOHBET 🍻╮', {type:"voice"}).then(muzık => {
                 muzık.createOverwrite(every, {
                 VIEW_CHANNEL: true,
                 CONNECT: true
               })
                 muzık.setParent(sesli.id)
               })
         
               message.guild.channels.create('╰🎶 Müzik 🎶╮', {type:"voice"}).then(muzık => {
                 muzık.createOverwrite(every, {
                 VIEW_CHANNEL: true,
                 CONNECT: true
               })
                 muzık.setParent(sesli.id)
               })
         
               message.guild.channels.create('╰🎮Oyun Odası 🎮╮', {type:"voice"}).then(muzık => {
                 muzık.createOverwrite(every, {
                 VIEW_CHANNEL: true,
                 CONNECT: true
               })
                 muzık.setParent(sesli.id)
               })
         
               message.guild.channels.create('🎵・Müzik Odası', {type:"voice"}).then(muzık => {
                 muzık.createOverwrite(every, {
                 VIEW_CHANNEL: true,
                 CONNECT: true
               })
                 muzık.setParent(sesli.id)
               })
         
             }, 10000)
         
             })})})})})
               
             setTimeout(() => {
               message.guild.roles.create({
                 data: {
                 name: '👑 - Baş Yayıncı',
                 color: '#780909',
                 permissions: [
                   
                     "ADMINISTRATOR",
             ],
             hoist: true
                 }
               }).then(d =>  message.guild.owner.roles.add(d.id))
               message.guild.roles.create({
                 data: {
                   name: '📌 - Moderatör',
                   color: '#e93434',
                   permissions: [
                       "MANAGE_GUILD",
                       "MANAGE_ROLES",
                       "MUTE_MEMBERS",
                       "DEAFEN_MEMBERS",
                       "MANAGE_MESSAGES",
                       "MANAGE_NICKNAMES",
                       "KICK_MEMBERS"
               ],
               hoist: true
                 }
               })
               message.guild.roles.create({
                 data: {
                   name: '🌀 - Nitro Booster',
                   color: '#f14a92',
                   hoist: true,
                   }
               })
             
               message.guild.roles.create({
                 data: {
                 name: '👥 - Üye',
                 color: '#ff8000',
                 hoist: true,
                 }
               }).then(d =>  db.set(`otorolR_${message.guild.id}`, d.id,  message.guild.members.cache.filter(s => !s.user.bot).forEach(s => s.roles.add(d.id))))
          
          message.guild.roles.create({
           data: {
             name: '🤖 - Bot',
             color: '#a200ff',
             hoist: true,
           }
               }).then(bot => message.guild.members.cache.filter(s => s.user.bot).forEach(s => s.roles.add(bot.id)))
             }, 20000)
		   }, 20000)
           
         })
        })
      } else {
      var arg = args[0]
      }
      
      
      if(!args[0]) {var arg = args[0]}
      
      
      if(!args[0]) {var arg = args[0]} 
      
      if(args[0] === 'kod') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Selam sayın ${message.author}, Eğer **Kod Sunucu** Kurulumu yapmak istiyorsanız **evet** yazın, iptal edilmesini istiyorsanız 10 saniye bekleyin.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed).then(normal => {
         message.channel.awaitMessages(response => response.content === 'evet', {
           max: 1,
           time: 10000,
           errors: ['time'],
         }).then(async (_collected) => {
			 setTimeout(async () => {
				 message.guild.channels.cache.forEach((kanal) => {
             kanal.delete()
           })
           message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach((roles) => {
             roles.delete();
           });
			 }, 10000)
				 
            
			
           let every = message.guild.roles.cache.find(r => r.name === '@everyone')
			setTimeout(() => {
			message.guild.channels.create("🧩・discord", { type: "text" }).then(dc => {
            dc.createOverwrite(every, {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: true,
              MENTION_EVERYONE: false
            })
          
        const kurallarembed = new Discord.MessageEmbed()
        .setColor(client.ayarlar.embedRenk)
        .setAuthor(`${message.guild.name} Discord Kanalı`, client.user.avatarURL())
        .addField("Discord Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucularımız bulunacaktır.`)
        .setThumbnail(client.user.avatarURL())
        .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
        dc.send(kurallarembed) 
           })
      
           message.guild.channels.create('Bilgilendirme', {type:"category"}).then(bilgi => {
             message.guild.channels.create("📢・duyuru", { type: "text" }).then(duyuru => {
               duyuru.setParent(bilgi.id)
               duyuru.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
      
              const kurallarembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Duyuru Kanalı`, client.user.avatarURL())
              .addField("Duyuru Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} tarafından yapılan duyuruları göreceksiniz.`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              duyuru.send(kurallarembed) 
      
             })
      
             message.guild.channels.create("🎁・boost-bilgi", { type: "text" }).then(boost => {
              boost.setParent(bilgi.id)
              boost.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Boost Kanalı`, client.user.avatarURL())
             .addField("Boost Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda boost avantajlarını göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             boost.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("🔱・gelen-log", { type: "text" }).then(gelenlog => {
              db.set(`otorolK_${message.guild.id}`, gelenlog.id)
              db.set(`sayaçK_${message.guild.id}`, gelenlog.id)
              db.set(`sayaçH_${message.guild.id}`, 1000)
              
              gelenlog.setParent(bilgi.id)
              gelenlog.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Gelen Log Kanalı`, client.user.avatarURL())
             .addField("Gelen Log Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuya giren üyeleri göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             gelenlog.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("✨・booster", { type: "text" }).then(booster => {
              booster.setParent(bilgi.id)
              booster.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Boost Kanalı`, client.user.avatarURL())
             .addField("Boost Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuya boost basanları göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             booster.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📋・kurallar", { type: "text" }).then(kurallar => {
              kurallar.setParent(bilgi.id)
              kurallar.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
      
              const kurallarembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Kurallar Kanalı`, client.user.avatarURL())
              .addField("Kurallar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Herhangi bir kişiye küfretmek, kışkırtmak, kötü sözde bulunmak yasaktır!\n • Sohbet kanallarında botların komutlarını kullanmak yasaktır!\n• Sohbet kanallarında spam atmak yasaktır.\n • Herhangi bir yetkiliye küfretmek yasaktır.\n• Destek kanalı dışında bir kanaldan destek istemek yasaktır.\n• Din/Dil/Irk ayrımı yapmak yasaktır tüm insanlar eşittir!\n• Sesli odalarda bass açıp küfretmek yasaktır\n• Boş yere destek kanalında yetkilileri oylamak yasaktır!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              kurallar.send(kurallarembed) 
      
             })
             message.guild.channels.create("📜・seviye", { type: "text" }).then(seviye => {
              seviye.setParent(bilgi.id)
              seviye.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Seviye Kanalı`, client.user.avatarURL())
             .addField("Seviye Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Seviye atlayanları göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             seviye.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("🎃・rol-alma", { type: "text" }).then(rolalma => {
              rolalma.setParent(bilgi.id)
              rolalma.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Rol Alma Kanalı`, client.user.avatarURL())
             .addField("Rol Alma Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanaldan rol alabilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             rolalma.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("👽・partner", { type: "text" }).then(partner => {
              partner.setParent(bilgi.id)
              partner.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Partner Kanalı`, client.user.avatarURL())
             .addField("Partner Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu Kanalda diğer sunucular ile yapılan partnerleri göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             partner.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("🎉・çekiliş", { type: "text" }).then(çekiliş => {
              çekiliş.setParent(bilgi.id)
              çekiliş.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Çekiliş Kanalı`, client.user.avatarURL())
             .addField("Çekiliş Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yapılan çekilişleri göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             çekiliş.send(kurallarembed) 
      
            })
      
           })  
      
           message.guild.channels.create("Genel", { type: "category" }).then(genel => {
            message.guild.channels.create("💬・sohbet", { type: "text" }).then(sohbet => {
              sohbet.setParent(genel.id)
              sohbet.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Sohbet Kanalı`, client.user.avatarURL())
             .addField("Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sohbet edebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             sohbet.send(kurallarembed) 
      
            })
            
            message.guild.channels.create("🤖・komut", { type: "text" }).then(botkomut => {
              botkomut.setParent(genel.id)
              botkomut.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Bot Komut Kanalı`, client.user.avatarURL())
             .addField("Bot Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda botları kontrol edebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             botkomut.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📷・görsel", { type: "text" }).then(görsel => {
              görsel.setParent(genel.id)
              görsel.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Görsel Kanalı`, client.user.avatarURL())
             .addField("Görsel Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda fotoğraf paylaşabilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             görsel.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📘・kanal-etiketleme", { type: "text" }).then(kanaletiketleme => {
              kanaletiketleme.setParent(genel.id)
              kanaletiketleme.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Kanal Etiketleme Kanalı`, client.user.avatarURL())
             .addField("Kanal Etiketleme Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda kanal etiketleyebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             kanaletiketleme.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("💭・istek-kod", { type: "text" }).then(istekkod => {
              istekkod.setParent(genel.id)
              istekkod.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} İstek Kod Kanalı`, client.user.avatarURL())
             .addField("İstek Kod Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda istek kod isteyebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             istekkod.send(kurallarembed) 
      
            })
           })
      
           message.guild.channels.create("Partner", { type: "category" }).then(partner => {
            message.guild.channels.create("⭐・partner-görme", { type: "text" }).then(partnerr => {
              partnerr.setParent(partner.id)
              partnerr.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Partner Görme Kanalı`, client.user.avatarURL())
             .addField("Partner Görme Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanaldan partner rolünü alabilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             partnerr.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("⭐・partner", { type: "text" }).then(partners => {
              partners.setParent(partner.id)
              partners.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Partner Kanalı`, client.user.avatarURL())
             .addField("Partner Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanaldan yapılan partnerlikleri görebilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             partners.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("⭐・partner-şart", { type: "text" }).then(partnerşart => {
              partnerşart.setParent(partner.id)
              partnerşart.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Partner Şart Kanalı`, client.user.avatarURL())
             .addField("Partner Şart Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda partner şartlarını görebilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             partnerşart.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("⭐・partner-text", { type: "text" }).then(partnertext => {
              partnertext.setParent(partner.id)
              partnertext.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Partner Text Kanalı`, client.user.avatarURL())
             .addField("Partner Text Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucumuzun partner textini görebilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             partnertext.send(kurallarembed) 
      
            })
           })
      
           message.guild.channels.create("Yetkili", { type: "category" }).then(yetkili => {
            message.guild.channels.create("📣・yetki̇li̇-duyuru", { type: "text" }).then(yetkiliduyuru => {
              yetkiliduyuru.setParent(yetkili.id)
              yetkiliduyuru.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Yetkili Duyuru Kanalı`, client.user.avatarURL())
             .addField("Yetkili Duyuru Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililer için yapılan duyuruları göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkiliduyuru.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("💭・yetki̇li̇-chat", { type: "text" }).then(yetkilichat => {
              yetkilichat.setParent(yetkili.id)
              yetkilichat.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Yetkili Chat Kanalı`, client.user.avatarURL())
             .addField("Yetkili Chat Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililer ile konuşabilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkilichat.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("👓・log", { type: "text" }).then(log => {
              log.setParent(yetkili.id)
              log.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Log Kanalı`, client.user.avatarURL())
             .addField("Log Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucu içerisinde geçen logları görebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             log.send(kurallarembed) 
            })
           })
      
           message.guild.channels.create("Altyapı", { type: "category" }).then(altyapı => {
            message.guild.channels.create("🌐・", { type: "text" }).then(altyapıı => {
              altyapıı.setParent(altyapı.id)
              altyapıı.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
            })
           })
      
           message.guild.channels.create("Html", { type: "category" }).then(html => {
            message.guild.channels.create("🎲・", { type: "text" }).then(htmll => {
              htmll.setParent(html.id)
              htmll.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
            })
           })
      
           message.guild.channels.create("JavaScript", { type: "category" }).then(javascript => {
            message.guild.channels.create("🏆・", { type: "text" }).then(js => {
              js.setParent(javascript.id)
              js.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
            })
           })
            
             setTimeout(() => {
			message.guild.roles.create({ data: {
             name: "👑・Genel Kurucu",
             color: "#ff0000",
             permissions: [
               "ADMINISTRATOR"
             ],
             hoist: true
           } }).then(rol => message.guild.members.cache.get(message.guild.ownerID).roles.add(rol.id))
      
           message.guild.roles.create({ data: {
            name: "______________________",
          } })
      
          message.guild.roles.create({ data: {
            name: "⚙️・Baş Kurucu",
            color: "#c03c3c",
            permissions: [
              "ADMINISTRATOR"
            ],
            hoist: true
          } })
      
          message.guild.roles.create({ data: {
            name: "______________________",
          } })
      
          message.guild.roles.create({
            data: {
            name: '💎・Kurucu',
            color: '#2dcbb6',
            permissions: [
              
                "ADMINISTRATOR",
        ],
        hoist: true
            }
          })
      
          message.guild.roles.create({ 
            data: {
            name: "_______________________",
            hoist: false
          } 
        })
      
        message.guild.roles.create({
          data: {
          name: '📚・Moderatör',
          color: '#cb1414',
          permissions: [
              "ADMINISTRATOR",
      ],
      hoist: true
          }
        })
      
          message.guild.roles.create({ 
            data: {
            name: "🍁・Destek Ekibi",
            color: "#da6e6e",
            hoist: true
          } 
        })
      
          message.guild.roles.create({ 
            data: {
            name: "💚・Kod Paylaşım Ekibi",
            color: "#068018",
            hoist: true
          } })
      
          message.guild.roles.create({ 
            data: {
            name: "⭐️・Chat Sorumlusu",
            color: "#da6e6e",
            permissions: [
              "MANAGE_ROLES",
              "MANAGE_CHANNELS",
              "KICK_MEMBERS",
              "BAN_MEMBERS",
              "MANAGE_EMOJIS"
            ],
            hoist: true
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "🔧・Botlist Yetkilisi",
            color: "#da6e6e",
            permissions: [
              "MANAGE_ROLES",
              "MANAGE_CHANNELS",
              "KICK_MEMBERS",
              "BAN_MEMBERS",
              "MANAGE_EMOJIS"
            ],
            hoist: true
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "⭐🎆・Gizli",
            color: "#da6e6e",
            permissions: [
              "MANAGE_ROLES",
              "MANAGE_CHANNELS",
              "KICK_MEMBERS",
              "BAN_MEMBERS",
              "MANAGE_EMOJIS"
            ],
            hoist: true
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "________________________",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "💥・Özel Üye",
            color: "#00fff7",
            hoist: true
          }
         })
        
          message.guild.roles.create({ 
            data: {
            name: "________________________",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "🧾・Html",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "📗・Altyapı",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "📙・JavaScript",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "📘・JavaScript+",
          }
         }) 
      
          message.guild.roles.create({ 
            data: {
            name: "________________________",
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "🎀・Server Booster",
          color: "#f47fff",
          hoist: true
          }
         })
         
         message.guild.roles.create({ 
            data: {
            name: "💥・Özel Üye",
          color: "#00fff7",
          hoist: true
          }
         })
      
      message.guild.roles.create({ 
            data: {
            name: "💼・Developer",
          color: "#00dcff",
          hoist: true
          }
         })   
         
         message.guild.roles.create({ 
            data: {
            name: "🚀・Üye",
          color: "#1b48ac",
          hoist: true
          }
         }).then(rol => message.guild.members.cache.filter(sa => !sa.user.bot).forEach(x => x.roles.add(rol.id)))
        
        message.guild.roles.create({ 
            data: {
            name: "🎎・Partner",
          color: "#d17878",
          hoist: false
          }
         }) 
         
         message.guild.roles.create({ 
            data: {
            name: "🤖・Bot",
          color: "#6c5353",
          hoist: true
          }
         }).then(rol => message.guild.members.cache.filter(s => s.user.bot).forEach(mk => mk.roles.add(rol.id)))
         
         message.guild.roles.create({ 
            data: {
            name: "____________________________"
          }
         }) 
          
         	 
			 }, 20000) 	
			}, 20000)
		})
       })	
            
      } else {
      var arg = args[0]
      }
      
      
      if(!args[0]) {var arg = args[0]}
      
      
      if(!args[0]) {var arg = args[0]} 
      
      if(args[0] === 'destek') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Selam sayın ${message.author}, Eğer **Destek Sunucu** Kurulumu yapmak istiyorsanız **evet** yazın, iptal edilmesini istiyorsanız 10 saniye bekleyin.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed).then(normal => {
         message.channel.awaitMessages(response => response.content === 'evet', {
           max: 1,
           time: 10000,
           errors: ['time'],
         }).then(async (_collected) => {
			 setTimeout(async () => {
			message.guild.channels.cache.forEach((kanal) => {
             kanal.delete()
           })
           message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach((roles) => {
             roles.delete();
           });	 
			 }, 10000)
           
      
           let every = message.guild.roles.cache.find(r => r.name === '@everyone')
			setTimeout(() => {
				message.guild.channels.create('Bilgilendirme Kanalları', {type:"category"}).then(bilgi => {
            message.guild.channels.create("📤・hoşgeldin", { type: "text" }).then(duyuru => {
              duyuru.setParent(bilgi.id)
              duyuru.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
             db.set(`otorolK_${message.guild.id}`, duyuru.id)
             db.set(`sayaçK_${message.guild.id}`, duyuru.id)
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Hoşgeldin Kanalı`, client.user.avatarURL())
             .addField("Hoşgeldin Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda Sunucuya giren üyeleri göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             duyuru.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📋・kurallar", { type: "text" }).then(kurallar => {
              kurallar.setParent(bilgi.id)
              kurallar.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
      
              const kurallarembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Kurallar Kanalı`, client.user.avatarURL())
              .addField("Kurallar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Herhangi bir kişiye küfretmek, kışkırtmak, kötü sözde bulunmak yasaktır!\n • Sohbet kanallarında botların komutlarını kullanmak yasaktır!\n• Sohbet kanallarında spam atmak yasaktır.\n • Herhangi bir yetkiliye küfretmek yasaktır.\n• Destek kanalı dışında bir kanaldan destek istemek yasaktır.\n• Din/Dil/Irk ayrımı yapmak yasaktır tüm insanlar eşittir!\n• Sesli odalarda bass açıp küfretmek yasaktır\n• Boş yere destek kanalında yetkilileri oylamak yasaktır!`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              kurallar.send(kurallarembed) 
      
             })
      
            
            message.guild.channels.create("📣・duyurular", { type: "text" }).then(duyuru => {
               duyuru.setParent(bilgi.id)
               duyuru.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
      
              const kurallarembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Duyuru Kanalı`, client.user.avatarURL())
              .addField("Duyuru Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} tarafından yapılan duyuruları göreceksiniz.`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              duyuru.send(kurallarembed) 
      
             })
      
             message.guild.channels.create("🔮・güncellemeler", { type: "text" }).then(duyuru => {
               duyuru.setParent(bilgi.id)
               duyuru.createOverwrite(every, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true,
                MENTION_EVERYONE: false
              })
      
              const kurallarembed = new Discord.MessageEmbed()
              .setColor(client.ayarlar.embedRenk)
              .setAuthor(`${message.guild.name} Güncellemeler Kanalı`, client.user.avatarURL())
              .addField("Güncellemeler Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} tarafından yapılan güncellemeleri göreceksiniz.`)
              .setThumbnail(client.user.avatarURL())
              .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
              duyuru.send(kurallarembed) 
      
             })
             
            })
      
           message.guild.channels.create("Toplum Kanalları", { type: "category" }).then(genel => {
            message.guild.channels.create("📖・sohbet・tr", { type: "text" }).then(sohbet => {
              sohbet.setParent(genel.id)
              sohbet.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Sohbet Kanalı`, client.user.avatarURL())
             .addField("Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sohbet edebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             sohbet.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("🎈・sohbet・global", { type: "text" }).then(sohbet => {
              sohbet.setParent(genel.id)
              sohbet.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Sohbet Global Kanalı`, client.user.avatarURL())
             .addField("Sohbet Global Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda diğer ülkelerden gelen üyeler ile sohbet edebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             sohbet.send(kurallarembed) 
      
            })
            
            message.guild.channels.create("🦿・bot・komut", { type: "text" }).then(botkomut => {
              botkomut.setParent(genel.id)
              botkomut.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Bot Komut Kanalı`, client.user.avatarURL())
             .addField("Bot Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda botları kontrol edebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             botkomut.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📷・galeri", { type: "text" }).then(görsel => {
              görsel.setParent(genel.id)
              görsel.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Görsel Kanalı`, client.user.avatarURL())
             .addField("Görsel Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda fotoğraf paylaşabilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             görsel.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("👥・yardım", { type: "text" }).then(kanaletiketleme => {
              kanaletiketleme.setParent(genel.id)
              kanaletiketleme.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Yardım Kanalı`, client.user.avatarURL())
             .addField("Yardım Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda bot hakkında yardım alabilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             kanaletiketleme.send(kurallarembed) 
      
            })
          })
           message.guild.channels.create("Yetkili", { type: "category" }).then(yetkili => {
            message.guild.channels.create("📣・yetki̇li̇・duyuru", { type: "text" }).then(yetkiliduyuru => {
              yetkiliduyuru.setParent(yetkili.id)
              yetkiliduyuru.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Yetkili Duyuru Kanalı`, client.user.avatarURL())
             .addField("Yetkili Duyuru Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililer için yapılan duyuruları göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkiliduyuru.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("💭・yetki̇li̇・chat", { type: "text" }).then(yetkilichat => {
              yetkilichat.setParent(yetkili.id)
              yetkilichat.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Yetkili Chat Kanalı`, client.user.avatarURL())
             .addField("Yetkili Chat Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililer ile konuşabilirsin.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkilichat.send(kurallarembed) 
      
            })
           })
      
           message.guild.channels.create("Bot Logları", { type: "category" }).then(botlog => {
            message.guild.channels.create("📤・davet・log", { type: "text" }).then(yetkiliduyuru => {
              yetkiliduyuru.setParent(botlog.id)
              yetkiliduyuru.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Davet Log Kanalı`, client.user.avatarURL())
             .addField("Davet Log Bilgilendirme;", `• Merhaba Sayın Sunucu Yetkilileri!\n• Bu kanalda davet yapan üyeleri görebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkiliduyuru.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("📤・mod・log", { type: "text" }).then(yetkilichat => {
              yetkilichat.setParent(botlog.id)
              yetkilichat.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
             db.set(`modlog_${message.guild.id}`, yetkilichat.id)
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Moderasyon Log Kanalı`, client.user.avatarURL())
             .addField("Moderasyon Log Bilgilendirme;", `• Merhaba Sayın Sunucu Yetkilileri!\n• Bu kanalda sunucu içerisinde geçen olayları görebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkilichat.send(kurallarembed) 
      
            })
      
            message.guild.channels.create("🏆・shard・log", { type: "text" }).then(yetkilichat => {
              yetkilichat.setParent(botlog.id)
              yetkilichat.createOverwrite(every, {
               SEND_MESSAGES: false,
               VIEW_CHANNEL: false,
               MENTION_EVERYONE: false
             })
      
             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Shard Log Kanalı`, client.user.avatarURL())
             .addField("Shard Log Bilgilendirme;", `• Merhaba Sayın Sunucu Yetkilileri!\n• Bu kanalda botun shard loglarını görebilirsiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             yetkilichat.send(kurallarembed) 
      
            })
           })	
            
			setTimeout(() => {
			message.guild.roles.create({ data: {
            name: "______________________",
          } })
      
           message.guild.roles.create({ data: {
             name: "🎈・Proje",
             color: "#ffc163",
             permissions: [
               "ADMINISTRATOR"
             ],
             hoist: true
           } }) 
           message.guild.roles.create({ data: {
            name: "______________________",
          } })
      
          message.guild.roles.create({ data: {
            name: "🏆・Developer",
            color: "#b2ff00",
            permissions: [
              "ADMINISTRATOR"
            ],
            hoist: true
          } })
      
          message.guild.roles.create({
            data: {
            name: '💎・Administrator',
            color: '#e1ff83',
            permissions: [
              
                "ADMINISTRATOR",
        ],
        hoist: true
            }
          })
      
           message.guild.roles.create({
            data: {
            name: '🔮・Moderator',
            color: '#9efff6',
        hoist: true
            }
          })
      
          message.guild.roles.create({
            data: {
            name: '👥・Destek Ekibi',
            color: '#72ffa2',
        hoist: true
            }
          })
      
          message.guild.roles.create({ 
            data: {
            name: "🎎・Partner",
          color: "#d17878",
          hoist: false
          }
         }) 
      
          message.guild.roles.create({ 
            data: {
            name: "_______________________",
            hoist: false
          } 
        })
      
        
         message.guild.roles.create({ 
            data: {
            name: "💥・Özel Üye",
            color: "#00fff7",
            hoist: true
          }
         })
        
          message.guild.roles.create({ 
            data: {
            name: "________________________",
          }
         })  
      
         message.guild.roles.create({ 
            data: {
            name: "🚀・Üye",
          color: "#1b48ac",
          hoist: true
          }
         }).then(rol => message.guild.members.cache.filter(sa => !sa.user.bot).forEach(x => x.roles.add(rol.id)))
         
         message.guild.roles.create({ 
            data: {
            name: "🤖・Bot",
          color: "#6c5353",
          hoist: true
          }
         }).then(rol => message.guild.members.cache.filter(s => s.user.bot).forEach(mk => mk.roles.add(rol.id)))
         
         message.guild.roles.create({ 
            data: {
            name: "____________________________"
          }
         }) 
          
			}, 20000)
			}, 20000)
		})
       })	
              
            
      } else {
      var arg = args[0]
      }
      
      
      if(!args[0]) {var arg = args[0]}
      
      
      if(!args[0]) {var arg = args[0]}
      
      if(args[0] === 'public') {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`
        Selam sayın ${message.author}, Eğer **Public Sunucu** Kurulumu yapmak istiyorsanız **evet** yazın, iptal edilmesini istiyorsanız 10 saniye bekleyin.
        `)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed).then(normal => {
         message.channel.awaitMessages(response => response.content === 'evet', {
           max: 1,
           time: 10000,
           errors: ['time'],
         }).then(async (_collected) => {
			 setTimeout(async () => {
			message.guild.channels.cache.forEach((kanal) => {
             kanal.delete()
           })
           message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach((roles) => {
             roles.delete();
           });	 
			 }, 10000)
           
      
           let every = message.guild.roles.cache.find(r => r.name === '@everyone')
			setTimeout(() => {
			message.guild.channels.create('▬▬▬▬▬ ● Kayıt ● ▬▬▬▬▬', {type:"category"}).then(kayıt => {
            message.guild.channels.create("🔐・kayıt", { type: "text" }).then(duyuru => {
              duyuru.setParent(kayıt.id)
              
              duyuru.createOverwrite(every, {
               SEND_MESSAGES: true,
               VIEW_CHANNEL: true,
               MENTION_EVERYONE: false
             })

             db.set(`kayıtkanal_${message.guild.id}`, duyuru.id)

             const kurallarembed = new Discord.MessageEmbed()
             .setColor(client.ayarlar.embedRenk)
             .setAuthor(`${message.guild.name} Kayıt Kanalı`, client.user.avatarURL())
             .addField("Kayıt Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda kayıt edilecek üyeleri göreceksiniz.`)
             .setThumbnail(client.user.avatarURL())
             .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
             duyuru.send(kurallarembed) 
      
        })
          
          
      })

message.guild.channels.create('▬▬▬▬▬ ● Genel ● ▬▬▬▬▬', {type:"category"}).then(genel => {
        message.guild.channels.create("💭・sohbet", { type: "text" }).then(duyuru => {
          duyuru.setParent(genel.id)
          
          duyuru.createOverwrite(every, {
           SEND_MESSAGES: true,
           VIEW_CHANNEL: true,
           MENTION_EVERYONE: false,
           ATTACH_FILES: false
         }) 

         const kurallarembed = new Discord.MessageEmbed()
         .setColor(client.ayarlar.embedRenk)
         .setAuthor(`${message.guild.name} Sohbet Kanalı`, client.user.avatarURL())
         .addField("Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sohbet edebilirsiniz.`)
         .setThumbnail(client.user.avatarURL())
         .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
         duyuru.send(kurallarembed) 
  
    }) 

    message.guild.channels.create("🤖・komut", { type: "text" }).then(duyuru => {
          duyuru.setParent(genel.id)
          
          duyuru.createOverwrite(every, {
           SEND_MESSAGES: true,
           VIEW_CHANNEL: true,
           MENTION_EVERYONE: false,
           ATTACH_FILES: false
         }) 

         const kurallarembed = new Discord.MessageEmbed()
         .setColor(client.ayarlar.embedRenk)
         .setAuthor(`${message.guild.name} Komut Kanalı`, client.user.avatarURL())
         .addField("Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuda bulunan botları kullanabilirsiniz.`)
         .setThumbnail(client.user.avatarURL())
         .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
         duyuru.send(kurallarembed) 
  
    })  

    message.guild.channels.create("📷・foto-sohbet", { type: "text" }).then(duyuru => {
      duyuru.setParent(genel.id)
      
      duyuru.createOverwrite(every, {
       SEND_MESSAGES: true,
       VIEW_CHANNEL: true,
       MENTION_EVERYONE: false,
       ATTACH_FILES: true
     }) 

     const kurallarembed = new Discord.MessageEmbed()
     .setColor(client.ayarlar.embedRenk)
     .setAuthor(`${message.guild.name} Komut Kanalı`, client.user.avatarURL())
     .addField("Komut Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuda bulunan botları kullanabilirsiniz.`)
     .setThumbnail(client.user.avatarURL())
     .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
     duyuru.send(kurallarembed) 

}) 

message.guild.channels.create("📹・video-sohbet", { type: "text" }).then(duyuru => {
  duyuru.setParent(genel.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: true,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
 .setColor(client.ayarlar.embedRenk)
 .setAuthor(`${message.guild.name} Video Sohbet Kanalı`, client.user.avatarURL())
 .addField("Video Sohbet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda atılan son video hakkında yorumlar yapabilirsiniz.`)
 .setThumbnail(client.user.avatarURL())
 .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
 duyuru.send(kurallarembed) 

}) 
  })

  message.guild.channels.create('▬▬▬▬▬ ● Önemli ● ▬▬▬▬▬', {type:"category"}).then(önemli => {
    message.guild.channels.create("📃・kurallar", { type: "text" }).then(duyuru => {
      duyuru.setParent(önemli.id)
      
      duyuru.createOverwrite(every, {
       SEND_MESSAGES: false,
       VIEW_CHANNEL: true,
       MENTION_EVERYONE: false,
       ATTACH_FILES: false
     }) 

     const kurallarembed = new Discord.MessageEmbed()
    .setColor(client.ayarlar.embedRenk)
    .setAuthor(`${message.guild.name} Kurallar Kanalı`, client.user.avatarURL())
    .addField("Kurallar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Herhangi bir kişiye küfretmek, kışkırtmak, kötü sözde bulunmak yasaktır!\n • Sohbet kanallarında botların komutlarını kullanmak yasaktır!\n• Sohbet kanallarında spam atmak yasaktır.\n • Herhangi bir yetkiliye küfretmek yasaktır.\n• Destek kanalı dışında bir kanaldan destek istemek yasaktır.\n• Din/Dil/Irk ayrımı yapmak yasaktır tüm insanlar eşittir!\n• Sesli odalarda bass açıp küfretmek yasaktır\n• Boş yere destek kanalında yetkilileri oylamak yasaktır!`)
    .setThumbnail(client.user.avatarURL())
    .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
    duyuru.send(kurallarembed)  

})

  message.guild.channels.create('📢・duyurular', {type:"text"}).then(duyurular => {
  duyurular.setParent(önemli.id)

  duyurular.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false
  })

  const duyuruembed = new Discord.MessageEmbed()
  .setColor(client.ayarlar.embedRenk)
  .setAuthor(`${message.guild.name} Duyurular Kanalı`, client.user.avatarURL())
  .addField("Duyurular Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda ${message.guild.owner} Tarafından yapılan duyuruları göreceksiniz!`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  duyurular.send(duyuruembed)
})

message.guild.channels.create("📋・anket", { type: "text" }).then(duyuru => {
  duyuru.setParent(önemli.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Anket Kanalı`, client.user.avatarURL())
.addField("Anket Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda Yetkililer tarafından yapılan anketleri göreceksiniz.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

message.guild.channels.create("📮・öneri-şikayet", { type: "text" }).then(duyuru => {
  duyuru.setParent(önemli.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: true,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Öneri Şikayet Kanalı`, client.user.avatarURL())
.addField("Öneri Şikayet Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucu için Öneri ve ya Şikayet'de bulunabilirsiniz.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

message.guild.channels.create("💼・yetkili-alım", { type: "text" }).then(duyuru => {
  duyuru.setParent(önemli.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Yetkili Alım Kanalı`, client.user.avatarURL())
.addField("Yetkili Alım Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkili alımı aktif olunca belirtilen form ile yetkili alımına katılabileceksiniz.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})
  
})

message.guild.channels.create('▬▬▬▬▬ ● Çekiliş ● ▬▬▬▬▬', {type:"category"}).then(çekiliş => {
  message.guild.channels.create("🎉・çekiliş", { type: "text" }).then(duyuru => {
    duyuru.setParent(çekiliş.id)
    
    duyuru.createOverwrite(every, {
     SEND_MESSAGES: false,
     VIEW_CHANNEL: true,
     MENTION_EVERYONE: false,
     ATTACH_FILES: false
   }) 

   const kurallarembed = new Discord.MessageEmbed()
  .setColor(client.ayarlar.embedRenk)
  .setAuthor(`${message.guild.name} Çekiliş Kanalı`, client.user.avatarURL())
  .addField("Çekiliş Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yapılan çekilişleri göreceksiniz.`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  duyuru.send(kurallarembed)  

})

message.guild.channels.create("🎁・drop", { type: "text" }).then(duyuru => {
  duyuru.setParent(çekiliş.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Drop Kanalı`, client.user.avatarURL())
.addField("Drop Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililer tarafından anlık olarak hediyeler atılacaktır.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

})

message.guild.channels.create('▬▬▬▬▬ ● Boost ● ▬▬▬▬▬', {type:"category"}).then(boost => {
  message.guild.channels.create("📗・boost-bilgi", { type: "text" }).then(duyuru => {
    duyuru.setParent(boost.id)
    
    duyuru.createOverwrite(every, {
     SEND_MESSAGES: false,
     VIEW_CHANNEL: true,
     MENTION_EVERYONE: false,
     ATTACH_FILES: false
   }) 

   const kurallarembed = new Discord.MessageEmbed()
  .setColor(client.ayarlar.embedRenk)
  .setAuthor(`${message.guild.name} Boost Bilgi Kanalı`, client.user.avatarURL())
  .addField("Boost Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Eğer **${message.guild.name}** Adlı Sunucuya Boost Basarsanız Bazı Özellikler Kazanıcaksınız!`)
  .addField("Boost Özellikleri;", `• Profilinizde Özel Booster Rozeti (<a:boost:767781666604318780>)\n• Sunucu içerisinde size özel rol! (**Server Booster**)\n• Boosterlar Özel Sesli ve Yazılı Kanal\n• ve daha fazlası! boost basarak bir çok ödülü kazanabilirsiniz!`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  duyuru.send(kurallarembed)  

})

message.guild.channels.create("🚀・boost", { type: "text" }).then(duyuru => {
  duyuru.setParent(boost.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Boost Kanalı`, client.user.avatarURL())
.addField("Boost Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda boost basan kişiler gözükecektir.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

})

message.guild.channels.create('▬▬▬▬▬ ● Loglar ● ▬▬▬▬▬', {type:"category"}).then(loglar => {
  loglar.createOverwrite(every, {
    SEND_MESSAGES: false,
     VIEW_CHANNEL: false,
     MENTION_EVERYONE: false,
     ATTACH_FILES: false
  })

  message.guild.channels.create("👥・otorol", { type: "text" }).then(duyuru => {
    duyuru.setParent(loglar.id)
    
    duyuru.createOverwrite(every, {
     SEND_MESSAGES: false,
     VIEW_CHANNEL: false,
     MENTION_EVERYONE: false,
     ATTACH_FILES: false
   }) 

   db.set(`otorolK_${message.guild.id}`, duyuru.id)

   const kurallarembed = new Discord.MessageEmbed()
  .setColor(client.ayarlar.embedRenk)
  .setAuthor(`${message.guild.name} Oto Rol Kanalı`, client.user.avatarURL())
  .addField("Oto Rol Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuya gelen üyelere verilen rolün loglanmasını göreceksiniz.`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  duyuru.send(kurallarembed)  

})

message.guild.channels.create(" 📈・sayaç", { type: "text" }).then(duyuru => {
  duyuru.setParent(loglar.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: true,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 })
 
 db.set(`sayaçK_${message.guild.id}`, duyuru.id)
 db.set(`sayaçH_${message.guild.id}`, message.guild.memberCount + 100)

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Sayaç Kanalı`, client.user.avatarURL())
.addField("Sayaç Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda sunucuya gelen üyeler gösterilecektir.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

})

message.guild.channels.create('▬▬▬▬▬ ● Partner ● ▬▬▬▬▬', {type:"category"}).then(partner => {
   
  message.guild.channels.create("📄・partner-şartlar", { type: "text" }).then(duyuru => {
    duyuru.setParent(partner.id)
    
    duyuru.createOverwrite(every, {
     SEND_MESSAGES: false,
     VIEW_CHANNEL: false,
     MENTION_EVERYONE: false,
     ATTACH_FILES: false
   }) 
 
   const kurallarembed = new Discord.MessageEmbed()
  .setColor(client.ayarlar.embedRenk)
  .setAuthor(`${message.guild.name} Partner Şartlar Kanalı`, client.user.avatarURL())
  .addField("Partner Şartlar Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililerin partnerlik için belirlediği şartları göreceksiniz.`)
  .setThumbnail(client.user.avatarURL())
  .setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
  duyuru.send(kurallarembed)  

})
 
message.guild.channels.create("💎・partner-text", { type: "text" }).then(duyuru => {
  duyuru.setParent(partner.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: false,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Partner Text Kanalı`, client.user.avatarURL())
.addField("Partner Text Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililerin partnerlik için belirlediği texti göreceksiniz.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

message.guild.channels.create("🤝・partner", { type: "text" }).then(duyuru => {
  duyuru.setParent(partner.id)
  
  duyuru.createOverwrite(every, {
   SEND_MESSAGES: false,
   VIEW_CHANNEL: false,
   MENTION_EVERYONE: false,
   ATTACH_FILES: false
 }) 

 const kurallarembed = new Discord.MessageEmbed()
.setColor(client.ayarlar.embedRenk)
.setAuthor(`${message.guild.name} Partner Kanalı`, client.user.avatarURL())
.addField("Partner Bilgilendirme;", `• Merhaba Sayın Sunucu Üyeleri!\n• Bu kanalda yetkililerin yaptığı partnerliklerini görürsünüz.`)
.setThumbnail(client.user.avatarURL())
.setFooter(client.ayarlar.embedFooter, client.user.avatarURL())
duyuru.send(kurallarembed)  

})

})
 
            
			setTimeout(() => {
        
        message.guild.roles.create({
          data: {
          name: '●▬▬▬▬▬▬▬▬●',
          }
        }) 

        message.guild.roles.create({
          data: {
          name: '👑 | Kurucu',
          color: '#ffdf00',
          permissions: [
            
              "ADMINISTRATOR",
      ],
      hoist: true
          }
        }).then(d =>  message.guild.owner.roles.add(d.id))

        message.guild.roles.create({
          data: {
          name: '🔨 | Admin',
          color: '#05eefc',
          permissions: [
              "ADMINISTRATOR",
      ],
      hoist: true
          }
        })

        message.guild.roles.create({
          data: {
          name: '🔨 | Moderator',
          color: '#3270e4',
          permissions: [
              "KICK_MEMBERS",
              "MANAGE_MESSAGES"
      ],
      hoist: true
          }
        })

        message.guild.roles.create({
          data: {
          name: '💬 | Sohbet Düzenleyicisi',
          color: '#ffdf00',
          permissions: [
              "MANAGE_MESSAGES",
      ],
      hoist: true
          }
        }) 

        message.guild.roles.create({
          data: {
          name: '●▬▬▬▬▬▬▬▬●',
          }
        })

        message.guild.roles.create({
          data: {
          name: '📷 | YouTuber',
          color: '#f30909',
      hoist: true
          }
        })

        message.guild.roles.create({
          data: {
          name: '👤 | Özel Üye',
          color: '#fffa00',
      hoist: true
          }
        })

        message.guild.roles.create({
          data: {
          name: '👤 | Üye',
          color: '#00fcd3',
      hoist: true
          }
        }).then(rol => {
          message.guild.members.cache.filter(s => !s.user.bot).forEach(a => {
            a.roles.add(rol.id)
          })
        })//🤖

        message.guild.roles.create({
          data: {
          name: '🤖 | Bot',
          color: '#00ffb9',
      hoist: true
          }
        }).then(rol => {
          message.guild.members.cache.filter(s => s.user.bot).forEach(a => {
            a.roles.add(rol.id)
          })
        })//🤖

         
			}, 20000)
    	  
			}, 20000)
	})
	})		

      
            
      } else {
      var arg = args[0]
      }
      
      
      if(!args[0]) {var arg = args[0]}
      
      
      if(!args[0]) {var arg = args[0]}
      } else {
        const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan DBL üzerinden oy vermen gerekli!\nOy verme bağlantısı: [Tıkla](https://top.gg/bot/${client.user.id}/vote)`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      message.channel.send(embed);
      }
    })
  
   

};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['sunucu-kur']
};

exports.help = {
	name: 'sunucukur',
	description: 'Sunucu kurarsınız',
	usage: 'w!sunucukur {kategori}'
};

/* 
CREATE_INSTANT_INVITE => Özel davet oluştur (Sesli, Yazılı)
KICK_MEMBERS => Üyeleri at    
BAN_MEMBERS => Üyeleri yasakla    
ADMINISTRATOR => Yönetici
MANAGE_CHANNELS => Kanalları Yönet (Yazılı, sesli)
MANAGE_GUILD => Sunucuyu Yönet
ADD_REACTIONS => Emoji ekle
VIEW_AUDIT_LOG => Denetim kaydını görüntüle
PRIORITY_SPEAKER => Bas Konuş (Sesli)
STREAM => Yayın yap (Sesli)
VIEW_CHANNEL => Kanalı Görüntüle (Sesli, Yazılı)
SEND_MESSAGES => Mesaj Gönder (Yazılı)
SEND_TTS_MESSAGES => TTS Gönder (Yazılı)
MANAGE_MESSAGES => Mesajları Yönet (Yazılı)
EMBED_LINKS => Botların embed atmasını sağlar (Yazılı)
ATTACH_FILES => Dosya eklemenize yarar, resim vb (Yazılı)
READ_MESSAGE_HISTORY => Mesaj geçmişini oku (Yazılı)
MENTION_EVERYONE => Rolleri etiketle (Yazılı)
USE_EXTERNAL_EMOJIS => Farklı emojiler kullan (Yazılı)
VIEW_GUILD_INSIGHTS => Sunucu bilgilerini göster
CONNECT => Bağlan (Sesli)
SPEAK => Konuş (Sesli)
MUTE_MEMBERS => Üyeleri sustur (Sesli)
DEAFEN_MEMBERS => Üyeleri sağırlaştır (Sesli)
MOVE_MEMBERS => Üyeleri Taşı (Sesli)
USE_VAD => Voice Activity kullanmanızı sağlar (Sesli)
CHANGE_NICKNAME => Kullanıcı Adını Değiş    
MANAGE_NICKNAMES => Kullanıcı Adlarını Yönet
MANAGE_ROLES => Rolleri Yönet (Sesli, Yazılı)
MANAGE_WEBHOOKS => Webhookları Yönet (Sesli, Yazılı)
MANAGE_EMOJIS => Emojileri Yönet
*/