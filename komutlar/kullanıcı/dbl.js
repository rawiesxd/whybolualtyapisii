const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  const DBL = require("dblapi.js");
  const dbl = new DBL(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwMDYwODcwMjQyNzk1NTI3MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA2OTQwNDkzfQ.fnvelJE1xf_MBqLCbS3pLdQPMwnWJSnD5564ROihGB0`,client)
  if(!db.has(`üyelikk_${message.author.id}`) === "aktif") {
dbl.hasVoted(message.author.id).then(voted => {
	  if(voted === true) {
		  let mesaj = args.slice(0).join(" ");
  var botcuk = message.mentions.users.filter(s => s.ID !== client.user).first() || client.users.cache.get(args[0]) || client.users.cache.find(r => r.username === mesaj);
  if (!botcuk) return message.channel.send("Lütfen bir bot adı giriniz.");
  if (!dbl.getBot(botcuk.id)) return message.channel.send("Böyle bir bot yok.");
  dbl.getBot(botcuk.id).then(async bot => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.username}`, botcuk.avatarURL({ dynamic: true }))
      .setColor(client.ayarlar.embedRenk)
	  .addField("<a:dbl:782607258755923968> | Bot Bilgileri", `
	  > • | Bot Adı: **${bot.username}**
	  > • | Bot ID: **${bot.id}**
	  > • | Bot Tag: **#${bot.discriminator}**
	  > • | Bot Etiketleri: **${bot.tags.join(", ")}**
	  > • | Sunucu Sayısı: **${bot.server_count || "0"}**
	  > • | Kurucu(lar): <@${bot.owners.join(">\n<@")}>
	  > • | Prefix: **${bot.prefix}**
	  > • | Kütüphane: **${bot.lib}**
	  > • | Açıklama: **${bot.shortdesc}**
	  > • | Sertifika: **${bot.certifiedBot ? "Var" : "Yok"}**
	  `)
	  .addField("<:oy:782608516170121247> | Oy Bilgileri", `
	  > • | Oy Sayısı: **${bot.points || "0"}**
	  > • | Aylık Oy Sayısı: **${bot.monthlyPoints || "0"}**
	  `)
	  .addField(":link: | Bağlantılar", `[Destek Sunucusu](https://discord.gg/${bot.support}) **|** [Github](${bot.github}) **|** [DBL Sayfası](https://top.gg/bot/${bot.id})`)
      //.addField("Bot ID", bot.id, true)
      //.addField("İsim", bot.username, true)
      //.addField("Tag", bot.discriminator, true)
      //.addField("Sertifika", `${bot.certifiedBot ? "Evet" : "Hayır"}`, true)
      //.addField("Açıklama", bot.shortdesc, true)
      //.addField("Kütüphane", bot.lib, true)
      //.addField("Prefix", bot.prefix, true)
      //.addField("Oylar", bot.points || "0", true)
      //.addField("Aylık Oylar", bot.monthlyPoints || "0", true)
      //.addField("Sunucu sayısı", bot.server_count || "0", true)
      //.addField("Kurucu(lar)", `<@${bot.owners.join(">\n<@")}>`, true)
      //.addField("Etiket(ler)", `${bot.tags}`, true)
      //.addField("Linkler", `[Destek Sunucusu](https://discord.gg/${bot.support}) **|** [Github](${bot.github}) **|** [DBL Sayfası](https://top.gg/bot/${bot.id})`, true)
      //.setThumbnail(botcuk.avatarURL({ dynamic: true }))
      .setFooter(client.ayarlar.embedFooter, botcuk.avatarURL({ dynamic: true }))
    message.channel.send(embed);
  });
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
let mesaj = args.slice(0).join(" ");
  var botcuk = message.mentions.users.filter(s => s.ID !== client.user).first() || client.users.cache.get(args[0]) || client.users.cache.find(r => r.username === mesaj);
  if (!botcuk) return message.channel.send("Lütfen bir bot adı giriniz.");
  if (!dbl.getBot(botcuk.id)) return message.channel.send("Böyle bir bot yok.");
  dbl.getBot(botcuk.id).then(async bot => {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${bot.username}`, botcuk.avatarURL({ dynamic: true }))
      .setColor(client.ayarlar.embedRenk)
	  .addField("<a:dbl:782607258755923968> | Bot Bilgileri", `
	  > • | Bot Adı: **${bot.username}**
	  > • | Bot ID: **${bot.id}**
	  > • | Bot Tag: **#${bot.discriminator}**
	  > • | Bot Etiketleri: **${bot.tags.join(", ")}**
	  > • | Sunucu Sayısı: **${bot.server_count || "0"}**
	  > • | Kurucu(lar): <@${bot.owners.join(">\n<@")}>
	  > • | Prefix: **${bot.prefix}**
	  > • | Kütüphane: **${bot.lib}**
	  > • | Açıklama: **${bot.shortdesc}**
	  > • | Sertifika: **${bot.certifiedBot ? "Var" : "Yok"}**
	  `)
	  .addField("<:oy:782608516170121247> | Oy Bilgileri", `
	  > • | Oy Sayısı: **${bot.points || "0"}**
	  > • | Aylık Oy Sayısı: **${bot.monthlyPoints || "0"}**
	  `)
	  .addField(":link: | Bağlantılar", `[Destek Sunucusu](https://discord.gg/${bot.support}) **|** [Github](${bot.github}) **|** [DBL Sayfası](https://top.gg/bot/${bot.id}) **|** [WebSite](${bot.website})`)
    .setFooter(client.ayarlar.embedFooter, botcuk.avatarURL({ dynamic: true }))
    message.channel.send(embed);
  });
  }
   
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dbl-bilgi"]
};

exports.help = {
  name: "dbl",
  description: "dbl",
  usage: "dbl"
};