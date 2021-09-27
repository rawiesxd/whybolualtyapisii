const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
require("moment-duration-format")
exports.run = async(client, message, args, prefix) => {
    try {
        if(message.author.id !== message.guild.ownerID) return message.channel.send("Bu komutu kullanabilmek için sunucu kurucusu olman gerekli!")

        if(!args[0]) {
            const hata = new Discord.MessageEmbed()
            .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
            .setColor(client.ayarlar.embedRenk)
            .setDescription(`
            Yedekleme Sistemi Komutları Aşağıda Gözükecektir.

            > • | ${prefix}yedek oluştur => **Yedek Oluşturur.**
            > • | ${prefix}yedek sil => **Belirtilen Yedeği Siler.**
            > • | ${prefix}yedek temizle => **Yedek Kodlarınızı Temizler.**
            > • | ${prefix}yedek bilgi => **Belirtilen Yedek Hakkında Bilgi Verir.**
            > • | ${prefix}yedek liste => **Yedek Listenizi Gösterir.**
            `)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(hata)
        }

        if(args[0] === "oluştur" || args[0] === "al" || args[0] === "create") {
            
            if(db.fetch(`yedeklimit_${message.author.id}`) > 10) return message.channel.send(`Yedek Limitin 10'a ulaştı! Lütfen Bir yedek silin veya özel üyelik satın alın!`)
            let id = makeid(10)


            let creatingEmbed = new Discord.MessageEmbed()
          .setTitle(`Lütfen Bekleyiniz...`)
          .setDescription("Yedek Oluşturuluyor...")
          .setColor(client.ayarlar.embedRenk)
          .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        message.channel.send(creatingEmbed).then(sa => {
            const channels = message.guild.channels.cache.sort(function(a, b) { return a.position - b.position; }).array().map(c => {
                const channel = {
                  type: c.type,
                  name: c.name,
                  position: c.calculatedPosition
                };
                if (c.parent) channel.parent = c.parent.name;
                return channel;
              });
  
            const roles = message.guild.roles.cache.filter(r => r.name !== "@everyone").sort(function(a, b) {
                return a.position - b.position;
              })
              .array()
              .map(r => {
                const role = {
                  name: r.name,
                  color: r.color,
                  hoist: r.hoist,
                  permissions: r.permissions,
                  mentionable: r.mentionable,
                  position: r.position
                };
                return role;
              });

              const icon = message.guild.iconURL({ dynamic: true })

              const sunucuadı = message.guild.name

              db.push(`yedek_${message.author.id}`, { sunucuid: message.guild.id, kanal: channels, rol: roles, sunucuad: sunucuadı, sunucuicon: icon, owner: message.guild.ownerID, members: message.guild.memberCount, createdAt: message.guild.createdAt, yedekid: id })
              db.add(`yedeklimit_${message.author.id}`, 1)
              const başarılı = new Discord.MessageEmbed()
              .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
              .setDescription(`Sayın ${message.author}, Başarılı bir şekilde bu sunucu için yedek alındı!`)
              .addField("Yedek Kodu:", `> **${id}**`)
              .addField("Yedek Bilgileri:", `> Sunucu Adı: **${message.guild.name}**\n> Sunucu İD: **${message.guild.id}**\n> Kanal Sayısı: **${message.guild.channels.cache.size}**\n> Rol Sayısı: **${message.guild.roles.cache.size}**\n> Üye Sayısı: **${message.guild.memberCount}**\n> Sahib: ${message.guild.owner} (${message.guild.ownerID})`)
              .setColor(client.ayarlar.embedRenk)
              .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
              return sa.edit(başarılı)
            })
        }

        if(args[0] === "list" || args[0] === "liste") {
            let data = db.get(`yedek_${message.author.id}`)

            if(!db.has(`yedek_${message.author.id}`) === true) {
                var yok = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Sayın ${message.author}, Üzgünüm ancak yedek listeni gösteremicem! Sebep: \`Hiç Bir Yedek Kodun Yok!\``)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                    return message.channel.send(yok);
            }

            var list = Object.keys(data).map(_data => {
                return {
                    id: (data[_data].yedekid),
                    sunucuid: (data[_data].sunucuid),
                    kanal: (data[_data].kanal),
                    rol: (data[_data].rol),
                    sunucuadı: (data[_data].sunucuad),
                    sunucuicon: (data[_data].sunucuicon),
                    owner: (data[_data].owner),
                    members: (data[_data].members),
                    createdAt: (data[_data].createdAt)
                };
            }).sort((x, y) => x.createdAt - y.createdAt)
			
            var yedek = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Selam ${message.author}, Toplamda **${data.length}/10** Adet Yedeğiniz var!`)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))


            data.forEach((a, i) => {
				var tarih = ''
            if(moment(a.createdAt).format('MM') === '01') {
                var tarih = `${moment(a.createdAt).format('DD')} Ocak ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '02') {
                var tarih = `${moment(a.createdAt).format('DD')} Şubat ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '03') {
                var tarih = `${moment(a.createdAt).format('DD')} Mart ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '04') {
                var tarih = `${moment(a.createdAt).format('DD')} Nisan ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '05') {
                var tarih = `${moment(a.createdAt).format('DD')} Mayıs ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '06') {
                var tarih = `${moment(a.createdAt).format('DD')} Haziran ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '07') {
                var tarih = `${moment(a.createdAt).format('DD')} Temmuz ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '08') {
                var tarih = `${moment(a.createdAt).format('DD')} Ağustos ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '09') {
                var tarih = `${moment(a.createdAt).format('DD')} Eylül ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '10') {
                var tarih = `${moment(a.createdAt).format('DD')} Ekim ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '11') {
                var tarih = `${moment(a.createdAt).format('DD')} Kasım ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
            if(moment(a.createdAt).format('MM') === '12') {
                var tarih = `${moment(a.createdAt).format('DD')} Aralık ${moment(a.createdAt).format('YYYY HH:mm:ss')}`
            }
			
			yedek.addField(`${a.yedekid}`, `**${a.sunucuad}** (\`${tarih}\`)`)
            })

            return message.channel.send(yedek)
        }

        if(args[0] === "clear" || args[0] === "temizle") {
            let data = db.get(`yedek_${message.author.id}`)

            if(!db.has(`yedek_${message.author.id}`) === true) {
                var yok = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Sayın ${message.author}, Üzgünüm ancak yedek temizle adlı komutu gösteremicem! Sebep: \`Hiç Bir Yedek Kodun Yok!\``)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                    return message.channel.send(yok);
            }  

             const embed = new Discord.MessageEmbed()
             .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
             .setColor(client.ayarlar.embedRenk)
             .setDescription(`Selam ${message.author}, Eğer Yedek Kodlarınızı sıfırlamak istiyorsanız :white_check_mark: Emojisine tıklayın! (İptal Etmek İçin :x: Emojisine Tıklayın!)`)
             .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
             return message.channel.send(embed).then(msg => {
                msg.react("✅").then(() => msg.react("❌"));

                let yesFilter = (reaction, user) =>
                  reaction.emoji.name === "✅" && user.id === message.author.id;
                let noFilter = (reaction, user) =>
                  reaction.emoji.name === "❌" && user.id === message.author.id;
      
                let yes = msg.createReactionCollector(yesFilter, { time: 0 });
                let no = msg.createReactionCollector(noFilter, { time: 0 });
      
                yes.on("collect", r => {
					r.delete()
                   db.delete(`yedek_${message.author.id}`)
                   const ee = new Discord.MessageEmbed()
                   .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                   .setColor(client.ayarlar.embedRenk)
                   .setDescription(`Selam ${message.author}, Başarılı bir şekilde tüm yedek kodlarınız silindi!`)
                   .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                  msg.edit(ee).then(() => { msg.delete({ timeout: 5000 }) })
                });
      
                no.on("collect", r => {
                  msg.delete()
                });

                 
             })
        }

        if(args[0] === "sil" || args[0] === "remove") {
            let id = args[1]
            let data = db.get(`yedek_${message.author.id}`)

            if(!db.has(`yedek_${message.author.id}`) === true) {
                var yok = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Sayın ${message.author}, Üzgünüm ancak yedek sil adlı komutu gösteremicem! Sebep: \`Hiç Bir Yedek Kodun Yok!\``)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                    return message.channel.send(yok);
            }  

            if(data.length === 1) {
                db.delete(`yedek_${message.author.id}`)
             var yok = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Başarılı bir şekilde **${id}** İD'li yedek kodunu sildim!`)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                    return message.channel.send(yok);
            } else {
             db.set(`yedek_${message.author.id}`, data.filter(s => s.yedekid !== id))
             var yok = new Discord.MessageEmbed()
                     .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                     .setColor(client.ayarlar.embedRenk)
                     .setDescription(`Başarılı bir şekilde **${id}** İD'li yedek kodunu sildim!`)
                     .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                     return message.channel.send(yok);
            }
        }

        if (args[0] === "yükle") {
            let data = db.get(`yedek_${message.author.id}`)

             let id = args[0]

             if(!id) {
                var yok = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`Dostum, eğer bir yedek yüklemek istiyorsan o yedek kodunun id'sini belirtmelisin.`)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                return message.channel.send(yok);
             }

             if(data.includes((s) => s.yedekid !== id)) {
                var yok = new Discord.MessageEmbed()
                .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                .setColor(client.ayarlar.embedRenk)
                .setDescription(`Dostum, Yedek kodlarına baktım ve **${id}** İD'li bir kod bulamadım.`)
                .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                return message.channel.send(yok);
             }

             message.guild.channels.cache.forEach(async function(channel) {
                await channel.delete();
                   });
                   
                    message.guild.roles.cache.filter(role => role.members.every(member => !member.user.bot)).forEach(async function(roles) {
                      await roles.delete();
                    }); 

                    
        await data.filter((s) => s.rol == id).forEach(async function(role) {
            message.guild.roles.create({ data: { 
                name: role.name,
                color: role.color,
                permissions: role.permissions,
                hoist: role.hoist,
                mentionable: role.mentionable,
                position: role.position
             }, reason: "WhYBoLu Backup Sistemi" })
          });
  
          await data.filter((s) => s.kanal == id).filter(c => c.type == "category").forEach(ch => { 
            message.guild.channels.create(ch.name, {type: ch.type, permissionOverwrites: ch.permissionOverwriteArray });
            }); 
                                      
          await data.filter((s) => s.kanal == id).filter(c => c.type !== "category").forEach(ch => {
              message.guild.channels.create(ch.name,{ type: ch.type, permissionOverwrites: ch.permissionOverwriteArray}).then(c => {
                
                  const parent = message.guild.channels.cache.filter(c => c.type == "category").find(c => c.name === ch.parent);
               
                c.setParent(parent).catch(err => {
                  throw err;
                }) 
                });
            });

             message.guild.setName(data.filter((s) => s.sunucuad == id))
             message.guild.setIcon(data.filter((s) => s.sunucuicon == id))
          }
		  
		  if(args[0] === "bilgi") {
			  let id = args[1]
			  let data = db.get(`yedek_${message.author.id}`)
			  
			  if(!db.has(`yedek_${message.author.id}`) === true) {
                var yok = new Discord.MessageEmbed()
                    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
                    .setColor(client.ayarlar.embedRenk)
                    .setDescription(`Sayın ${message.author}, Üzgünüm ancak yedek bilgi adlı komutu gösteremicem! Sebep: \`Hiç Bir Yedek Kodun Yok!\``)
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
                    return message.channel.send(yok);
            }
			
			var list = Object.keys(data).map(_data => {
                return {
                    id: (data[_data].yedekid),
                    sunucuid: (data[_data].sunucuid),
                    kanal: (data[_data].kanal),
                    rol: (data[_data].rol),
                    sunucuadı: (data[_data].sunucuad),
                    sunucuicon: (data[_data].sunucuicon),
                    owner: (data[_data].owner),
                    members: (data[_data].members),
                    createdAt: (data[_data].createdAt)
                };
            })
			var tarih = '';
			if(moment.duration(list.map(s => s.createdAt)).format('MM') === '01') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Ocak ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '02') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Şubat ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '03') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Mart ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '04') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Nisan ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '05') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Mayıs ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '06') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Haziran ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '07') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Temmuz ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '08') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Ağustos ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '09') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Eylül ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '10') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Ekim ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '11') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Kasım ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
            if(moment.duration(list.map(s => s.createdAt)).format('MM') === '12') {
                var tarih = `${moment.duration(list.map(s => s.createdAt)).format('DD')} Aralık ${moment.duration(list.map(s => s.createdAt)).format('YYYY HH:mm:ss')}`
            }
			
			const embed = new Discord.MessageEmbed()
			.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic:true}))
			.setTitle(list.map(s => s.sunucuadı))
			//.addField("Oluşturulma Tarihi", `${tarih}`)
            .addField("Kanallar", `\`\`\`${list.map(s => s.kanal).join("\n")}\`\`\``)
			.setColor(client.ayarlar.embedRenk)
            .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic:true}))
			return message.channel.send(embed)
		  }

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

    } catch (error) {
        console.log(error)
        const hataembed = new Discord.MessageEmbed()
        .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
        .setColor(client.ayarlar.embedRenk)
        .setDescription(`WhYBoLu Dünyasında dolaşırken bir hata ile karşılaştım! lütfen bu hatayı sahibime bildir!\nHata: \`${error}\`\nDestek Sunucum: https://discord.gg/paypal`)
        .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        return message.channel.send(hataembed)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yedek"]
}

exports.help = {
    name: "testyedek",
    description: "yedekleme sistemi",
    usage: "w!testyedek"
}