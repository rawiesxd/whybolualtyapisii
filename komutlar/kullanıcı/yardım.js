const Discord = require("discord.js")
const db = require("quick.db")
exports.run = async(client, message, args) => {
  const prefix = (await db.fetch(`prefix_${message.guild.id}`)) || client.ayarlar.prefix
  
/*if(args[0] === 'kullanıcı') {
    const kullanıcıE = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .addField("<:kullanici:751443872650887188> | Kullanıcı Komutları:", `> • | [${prefix}istatistik](${client.ayarlar.destek}): **Bot istatistiklerini gösterir.**\n> • | [${prefix}kullanıcıbilgi](${client.ayarlar.destek}): **Etiketlediğiniz (veya sizin hakkınızda) hakkında bilgi verir.**\n> • | [${prefix}sunucubilgi](${client.ayarlar.destek}): **Sunucu hakkında bilgi verir.**\n> • | [${prefix}rastgeleemoji](${client.ayarlar.destek}): **Rastgele Emoji atar.**\n> • | [${prefix}wikipedia](${client.ayarlar.destek}): **Belirttiğiniz şeyi WikiPedia üzerinde araştırır.**\n> • | [${prefix}dbl](${client.ayarlar.destek}): **İsmi belirtilen botu Discord Bot List üzerinden aratır.**\n> • | [${prefix}base64](${client.ayarlar.destek}): **Belirtilen yazıyı base64 formatına çevirir.**\n> • | [${prefix}binary](${client.ayarlar.destek}): **Belirtilen yazıyı binary formatına çevirir.**\n> • | [${prefix}uyarıliste](${client.ayarlar.destek}): **Belirtilen kişinin uyarılarına bakarsınız.**`)
    .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]} 
//Kullanıcı kategorisi bitiş
 
//Yetkili kategorisi başlangıç
if(args[0] === 'yetkili') {
    const kullanıcıE = new Discord.MessageEmbed()
    .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
    .setColor(client.ayarlar.renk)
    .addField("<a:yetkili:739224670661902427> | Yetkili Komutları:", `> • | [${prefix}ban](${client.ayarlar.destek}): **Etiketlediğiniz kişiyi belirtilen sebep ile banlar.**\n> • | [${prefix}kick](${client.ayarlar.destek}): **Etiketlediğiniz kişiyi sunucudan atar.**\n> • | [${prefix}unban](${client.ayarlar.destek}): **İdsini belirttiğiniz kişinin yasaklamasını kaldırır.**\n> • | [${prefix}sil](${client.ayarlar.destek}): **Belirttiğiniz miktarda mesaj siler.**\n> • | [${prefix}prefix](${client.ayarlar.destek}): **Botun ön ekini ayarlar/sıfırlarsınız.**\n> • | [${prefix}mute](${client.ayarlar.destek}): **Belirtilen kişiyi susturursunuz.**\n> • | [${prefix}unmute](${client.ayarlar.destek}): **Belirtilen kişinin susturmasını kaldırırsınız.**\n> • | [${prefix}uyar](${client.ayarlar.destek}): **Belirtilen kişiye uyarı verirsiniz.**\n> • | [${prefix}uyarısil](${client.ayarlar.destek}): **Belirtilen kişinin belirtilen İD'li uyarınısı siler.**\n> • | [${prefix}uyarıtemizle](${client.ayarlar.destek}): **Belirtilen kişinin uyarılarını silersiniz.**`)
    .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Yetkili kategorisi bitiş

//Kayıt kategorisi başlangıç
if(args[0] === 'kayıt') {
  const kullanıcıE = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.renk)//<a:kayit:776776931445440513>
  .addField("<a:kayit:776776931445440513> | Kayıt Komutları:", `Yakında sizler ile...`)
  .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Kayıt kategorisi bitiş

//Moderasyon kategorisi başlangıç
if(args[0] === 'moderasyon') {
  const kullanıcıE = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.renk)//<a:moderasyon:776780537645105163>
  .addField("<:koruma:776477913838911578> | Filtre Komutları:", `> • | [${prefix}saas](${client.ayarlar.destek}): **SA-AS sistemini açıp/kapatırsınız.**\n> • | [${prefix}küfür](${client.ayarlar.destek}): **Küfür Engel sistemini açıp/kapatırsınız.**\n> • | [${prefix}reklam](${client.ayarlar.destek}): **Reklam Engel sistemini açıp/kapatırsınız.**\n> • | [${prefix}link](${client.ayarlar.destek}): **Link Engel sistemini açıp/kapatırsınız.**\n> • | [${prefix}spam-engel](${client.ayarlar.destek}): **Spam Engel sistemini açıp/kapatırsınız.**\n> • | [${prefix}capslock](${client.ayarlar.destek}): **Capslock Engel sistemini açıp/kapatırsınız.**`)
  .addField("<a:moderasyon:776780537645105163> | Moderasyon Komutları:", `> • | [${prefix}otorol](${client.ayarlar.destek}): **Otomatik Rol ayarlar/sıfırlarsınız.**\n> • | [${prefix}otorolmesaj](${client.ayarlar.destek}): **Otomatik Rol Mesajı ayarlar/sıfırlarsınız.**\n> • | [${prefix}sayaç](${client.ayarlar.destek}): **Sayaç ayarlar/sıfırlarsınız.**\n> • | [${prefix}sayaçbbmesaj](${client.ayarlar.destek}): **Sayaç BB Mesajı ayarlar/sıfırlarsınız.**\n> • | [${prefix}sayaçhgmesaj](${client.ayarlar.destek}): **Sayaç HG Mesajı ayarlar/sıfırlarsınız.**\n> • | [${prefix}yedek](${client.ayarlar.destek}): **Yedekleme sistemine bakarsınız. (Sunucu sahibi özel + Bakımda)**\n> • | [${prefix}muterole](${client.ayarlar.destek}): **Mute rolünü ayarlarsınız. (Anti Spam Mute Rolü)**\n> • | [${prefix}bansınır](${client.ayarlar.destek}): **Ban Sınır ayarlar/sıfırlarsınız. (Anti Spam Ban Sınırı)**\n> • | [${prefix}kicksınır](${client.ayarlar.destek}): **Kick Sınır ayarlar/sıfırlarsınız. (Anti Spam Kick Sınırı)**`)//> • | [${prefix}mutelog](${client.ayarlar.destek}): **Mute log kanalını ayarlar/sıfırlarsınız. (Mute sistemi log kanalı)**\n> • | [${prefix}muterol](${client.ayarlar.destek}): **Mute rolü ayarlar/sıfırlarsınız. (Mute sistemi verilecek rolü)**
  .addField("<a:moderasyon:776780537645105163> | Moderasyon Komutları 2:", `> • | [${prefix}modlog](${client.ayarlar.destek}): **Mod log kanalını ayarlar/sıfırlarsınız.**\n> • | [${prefix}muterol](${client.ayarlar.destek}): **Mute rolü ayarlar/sıfırlarsınız. (Mute sistemi verilecek rolü)**`)
  .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Moderasyon kategorisi bitiş

//Sunucu kategorisi başlangıç
if(args[0] === 'sunucu') {
  const kullanıcıE = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.renk)
  .addField("<a:davet:757259576981717029> | Sunucu Komutları:", `> • | [${prefix}sunucukur normal](${client.ayarlar.destek}): **Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur destek](${client.ayarlar.destek}): **Bot Destek Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur gif](${client.ayarlar.destek}): **Gif Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur kod](${client.ayarlar.destek}): **Kod Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur botlist](${client.ayarlar.destek}): **Bot List Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur tasarım](${client.ayarlar.destek}): **Tasarım Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur youtuber](${client.ayarlar.destek}): **YouTuber Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur hosting](${client.ayarlar.destek}): **Hosting Sunucu Kurarsınız.**\n> • | [${prefix}sunucukur public](${client.ayarlar.destek}): **Public Sunucu Kurarsınız.**`)
  .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Sunucu kategorisi bitiş

//Sahip kategorisi başlangıç
if(args[0] === 'sahip') {
  const kullanıcıE = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.renk)
  .addField("<a:sahip:776891798336438313> | Sahip Komutları:", `> • | [${prefix}eval](${client.ayarlar.destek}): **Belirtilen Kodu Çalıştırır. (Bot sahibi özel)**\n> • | [${prefix}goldekle](${client.ayarlar.destek}): **İD'si belirtilen kişiyi özel üyeliğe ekler. (Bot sahibi özel)**\n> • | [${prefix}beyazliste](${client.ayarlar.destek}): **Belirtilen kişiyi karalisteden çıkartır. (Bot sahibi özel)**\n> • | [${prefix}goldkaldır](${client.ayarlar.destek}): **İD'si belirtilen kişinin özel üyeliğini kaldırır. (Bot sahibi özel)**\n> • | [${prefix}karaliste](${client.ayarlar.destek}): **Belirtilen kişiyi karalisteye alır. (Bot sahibi özel)**\n> • | [${prefix}sunucukaraliste](${client.ayarlar.destek}): **Belirtilen sunucuyu karalisteye alır. (Bot sahibi özel)**`)
  .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Sahip kategorisi bitiş

//Sahip kategorisi başlangıç
if(args[0] === 'ekonomi') {
  const kullanıcıE = new Discord.MessageEmbed()
  .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
  .setColor(client.ayarlar.renk)
  .addField(":moneybag: | Ekonomi Komutları:", `
  > • | [${prefix}market](${client.ayarlar.destek}): **Eşya marketini gösterir.**
  > • | [${prefix}banka](${client.ayarlar.destek}): **Banka bilgilerinizi gösterir.**
  > • | [${prefix}çalış](${client.ayarlar.destek}): **Çalışıp para kazanırsınız.**
  > • | [${prefix}günlük](${client.ayarlar.destek}): **Günlük ödülünüzü alırsınız.**
  > • | [${prefix}kredikartı](${client.ayarlar.destek}): **Kredi kartı bilgilerinizi gösterir.**
  > • | [${prefix}duello](${client.ayarlar.destek}): **Belirttiğiniz kişi ile düello oynarsınız.**
  `)
  .addField(":link: | Linkler:", `• [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) •`)
  .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
  message.channel.send(kullanıcıE)
return
}else {
var arg = args[0]
}


if(!args[0]) {var arg = args[0]}


if(!args[0]) {var arg = args[0]}
//Sahip kategorisi bitiş
*/
  /*let guildSize = await client.shard.fetchClientValues('guilds.cache.size')
  let sunucu = guildSize.reduce((acc, guildCount) => acc + guildCount, 0)

  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
  ];*/
  let countDownDate = new Date("Jan 1, 2022 00:00:00").getTime();
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  let bilgi = [`Yeni Yıla **${days} Gün, ${hours} Saat, ${minutes} Dakika, ${seconds} Saniye** kaldı!`, `**[${client.ayarlar.botİsim}](https://top.gg/bot/${client.user.id}/vote)** Botuna oy verirseniz özel komutlara erişim sağlayabilirsiniz!`, `**[Destek](${client.ayarlar.destek})** Sunucumuza gelerek çekilişlere katılabilirsiniz!`, `${client.ayarlar.botİsim} Botu için her gün yeni güncellemeler getiriyoruz!`, `Eğer Gold Üyelik alırsanız bazı gizli özellikleri açabilirsiniz!`]
  let bilgiler = Math.floor(Math.random() * bilgi.length)
   
  //Promise.all(promises).then(results => {
     // const kullanıcı = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
    
      const yardım = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      if(message.channel.nsfw === true) {
        yardım.setDescription(`
        **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
        • | Merhaba ${message.author}, 
        • | Şuanda anlık olarak **${client.guilds.cache.size.toLocaleString()}** Adet sunucuya ve **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** Adet kullanıcıya hizmet veriyorum!
        • | ${bilgi[bilgiler]}
    
        **●▬▬▬▬▬▬▬▬【 Hakkımızda 】▬▬▬▬▬▬▬▬▬●**
        • | **${client.ayarlar.botİsim}** Botu **xd** Tarafından sizler için yapılmıştır ;)
        • | **31** Ayında yapılmaya başlandım.
    
        **●▬▬▬▬▬▬▬▬【 Komutlar [7] 】▬▬▬▬▬▬▬▬▬●**
        • | **Kullanıcı** Komutlarını görebilmek için 👥 Emojisine tıklayın.
        • | **Ekonomi** Komutlarını görebilmek için 💰 Emojisine tıklayın.
        • | **Sahip** Komutlarını görebilmek için 👑 Emojisine tıklayın.
        • | **Sunucu** Komutlarını görebilmek için ⚙️ Emojisine tıklayın.
        • | **Moderasyon** Komutlarını görebilmek için 🛡️ Emojisine tıklayın.
        • | **Yetkili** Komutlarını görebilmek için 🔧 Emojisine tıklayın.
        • | **Kayıt** Komutlarını görebilmek için 📖 Emojisine tıklayın.
        • | **Nsfw** Komutlarını görebilmek için <:nsfw:776481050926120960> Emojisine tıklayın.
        `)
      } else {
        yardım.setDescription(`
        **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
        • | Merhaba ${message.author}, 
        • | Şuanda anlık olarak **${client.guilds.cache.size.toLocaleString()}** Adet sunucuya ve **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** Adet kullanıcıya hizmet veriyorum!
        • | ${bilgi[bilgiler]}
    
        **●▬▬▬▬▬▬▬▬【 Hakkımızda 】▬▬▬▬▬▬▬▬▬●**
        • | **${client.ayarlar.botİsim}** Botu **xd** Tarafından sizler için yapılmıştır ;)
        • | **31** Ayında yapılmaya başlandım.
    
        **●▬▬▬▬▬▬▬▬【 Komutlar [7] 】▬▬▬▬▬▬▬▬▬●**
        • | **Kullanıcı** Komutlarını görebilmek için 👥 Emojisine tıklayın.
        • | **Ekonomi** Komutlarını görebilmek için 💰 Emojisine tıklayın.
        • | **Sahip** Komutlarını görebilmek için 👑 Emojisine tıklayın.
        • | **Sunucu** Komutlarını görebilmek için ⚙️ Emojisine tıklayın.
        • | **Moderasyon** Komutlarını görebilmek için 🛡️ Emojisine tıklayın.
        • | **Yetkili** Komutlarını görebilmek için 🔧 Emojisine tıklayın.
        • | **Kayıt** Komutlarını görebilmek için 📖 Emojisine tıklayın.
        `)
      }
     yardım .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      return message.channel.send(yardım).then(async selam => {
        await selam.react("👥")
        await selam.react("💰")
        await selam.react("👑")
        await selam.react("🔧")
        await selam.react("🛡️") 
        await selam.react("⚙️")
        await selam.react("📖")
        await selam.react("❌")
        if(message.channel.nsfw === true) {
          await selam.react("776481050926120960")
        }
  
  
        let kullaniciFilter = (reaction, user) => reaction.emoji.name === "👥" && user.id === message.author.id;
        let yes = selam.createReactionCollector(kullaniciFilter, { time: 30000 });
  
        let ekonomiFilter = (reaction, user) => reaction.emoji.name === "💰" && user.id === message.author.id;
        let ekonomi = selam.createReactionCollector(ekonomiFilter, { time: 30000 });
  
        let sahipFilter = (reaction, user) => reaction.emoji.name === "👑" && user.id === message.author.id;
        let sahipp = selam.createReactionCollector(sahipFilter, { time: 30000 });
      
        let yetkiliFilter = (reaction, user) => reaction.emoji.name === "🔧" && user.id === message.author.id;
        let yetkili = selam.createReactionCollector(yetkiliFilter, { time: 30000 });

        let moderasyonFilter = (reaction, user) => reaction.emoji.name === "🛡️" && user.id === message.author.id;
        let moderasyon = selam.createReactionCollector(moderasyonFilter, { time: 30000 });

        let sunucuFilter = (reaction, user) => reaction.emoji.name === "⚙️" && user.id === message.author.id;
        let sunucu = selam.createReactionCollector(sunucuFilter, { time: 30000 });

        let kayıtFilter = (reaction, user) => reaction.emoji.name === "📖" && user.id === message.author.id;
        let kayıt = selam.createReactionCollector(kayıtFilter, { time: 30000 });

        let nsfwFilter = (reaction, user) => reaction.emoji.id === "776481050926120960" && user.id === message.author.id;
        let nsfw = selam.createReactionCollector(nsfwFilter, { time: 30000 });

        let xFilter = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        let x = selam.createReactionCollector(xFilter, { time: 30000 });

        yes.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Kullanıcı Komutları [10] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}istatistik](${client.ayarlar.destek})** => **Bot Bilgilerini Gösterir.**
      • | **[${prefix}kullanıcıbilgi](${client.ayarlar.destek})** => **Kullanıcı Bilgilerinizi Gösterir.**
      • | **[${prefix}sunucubilgi](${client.ayarlar.destek})** => **Sunucu Bilgilerini Gösterir.**
      • | **[${prefix}shard](${client.ayarlar.destek})** => **Shard Bilgilerini Gösterir.**
      • | **[${prefix}wikipedia](${client.ayarlar.destek})** => **WikiPedia Üzerinden Araştırma Yaparsınız.**
      • | **[${prefix}dbl](${client.ayarlar.destek})** => **DBL Üzerinden Araştırma Yaparsınız.**
      • | **[${prefix}rastgeleemoji](${client.ayarlar.destek})** => **Rastgele Emoji Görürsünüz.**
      • | **[${prefix}avatar](${client.ayarlar.destek})** => **Profil Fotoğrafınızı Görürsünüz.**
      • | **[${prefix}base64](${client.ayarlar.destek})** => **Yazdığınız Yazıyı Base64 Formatına Çevirir.**
      • | **[${prefix}binary](${client.ayarlar.destek})** => **Yazdığınız Yazıyı Binary Formatına Çevirir.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
      selam.edit(saaa)

      await selam.react("◀️")

        let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
        let geri = selam.createReactionCollector(geriFilter, { time: 30000 });

        geri.on("collect", nbr => {
          nbr.remove()
          selam.edit(yardım)
          sa.remove()
        })
        })
  
        ekonomi.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Ekonomi Komutları [9] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}banka](${client.ayarlar.destek})** => **Banka Bilgilerinizi Gösterir.**
      • | **[${prefix}kredikartı](${client.ayarlar.destek})** => **Kredi Kartı Bilgilerinizi Gösterir.**
      • | **[${prefix}market](${client.ayarlar.destek})** => **Marketi Gösterir.**
      • | **[${prefix}çalış](${client.ayarlar.destek})** => **Çalışırsınız.**
      • | **[${prefix}günlük](${client.ayarlar.destek})** => **Günlük ödülünüzü alırsınız.**
      • | **[${prefix}düello](${client.ayarlar.destek})** => **Düello yaparsınız.**
      • | **[${prefix}kredisıralama](${client.ayarlar.destek})** => **Kredi Sıralamasını Görürsünüz.**
      • | **[${prefix}pakethediye](${client.ayarlar.destek})** => **Belirtilen Kişiye Özel Üyelik Paket Hediye Edersiniz.**
      • | **[${prefix}kredi](${client.ayarlar.destek})** => **Gold Kredi Bilgilerinize Bakar/Gold KRedisi Transfer Edersiniz.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
          selam.edit(saaa)

          await selam.react("◀️")

        let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
        let geri = selam.createReactionCollector(geriFilter, { time: 30000 });

        geri.on("collect", nbr => {
          nbr.remove()
          selam.edit(yardım)
          sa.remove()
        })
        })
  
        sahipp.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Sahip Komutları [6] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}beyazliste](${client.ayarlar.destek})** => **Karalistede Bulunan Kişiyi Beyazlisteye Alır.**
      • | **[${prefix}karaliste](${client.ayarlar.destek})** => **Belirtilen Kişiyi Karalisteye Alır.**
      • | **[${prefix}eval](${client.ayarlar.destek})** => **Belirtilen Kodu Çalıştırır.**
      • | **[${prefix}güncelleme](${client.ayarlar.destek})** => **Güncelleme Duyurusu Yapar.**
      • | **[${prefix}sunucukaraliste](${client.ayarlar.destek})** => **Belirtilen Sunucuyu Karalisteye Alır.**
      • | **[${prefix}yenile](${client.ayarlar.destek})** => **Belirtilen Komutu Yeniler.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        selam.edit(saaa)

        await selam.react("◀️")

        let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
        let geri = selam.createReactionCollector(geriFilter, { time: 30000 });

        geri.on("collect", nbr => {
          nbr.remove()
          selam.edit(yardım)
          sa.remove()
        })
        })

        yetkili.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Yetkili Komutları [11] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}ban](${client.ayarlar.destek})** => **Belirtilen Kişiyi Sunucudan Yasaklar.**
      • | **[${prefix}kick](${client.ayarlar.destek})** => **Belirtilen Kişiyi Sunucudan Atar.**
      • | **[${prefix}nuke](${client.ayarlar.destek})** => **Kanalı Yeniler.**
      • | **[${prefix}oylama](${client.ayarlar.destek})** => **Oylama Yaparsınız.**
      • | **[${prefix}prefix](${client.ayarlar.destek})** => **Botun Ön Ekini Değiştirirsiniz.**
      • | **[${prefix}temizle](${client.ayarlar.destek})** => **Belirttiğiniz Miktarda Mesaj Siler.**
      • | **[${prefix}unban](${client.ayarlar.destek})** => **Belirtilen İDli Kişinin Yasaklanmasını Kaldırır.**
      • | **[${prefix}uyarı](${client.ayarlar.destek})** => **Belirtilen Kişiye Uyarı Verirsiniz.**
      • | **[${prefix}uyarısil](${client.ayarlar.destek})** => **Belirtilen Kişinin Belirtilen Uyarısını Silersiniz.**
      • | **[${prefix}uyarıtemizle](${client.ayarlar.destek})** => **Belirtilen Kişinin Uyarılarını Temizlersiniz.**
      • | **[${prefix}uyarıliste](${client.ayarlar.destek})** => **Belirtilen Kişinin Uyarılarına Bakarsınız.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
        selam.edit(saaa)

        await selam.react("◀️")

        let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
        let geri = selam.createReactionCollector(geriFilter, { time: 30000 });

        geri.on("collect", nbr => {
            nbr.remove()
            selam.edit(yardım)
            sa.remove()
          })
        })

        moderasyon.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Moderasyon Komutları [16] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}yedek](${client.ayarlar.destek})** => **Yedekleme Menüsünü Gösterir. (Bakımda)**
      • | **[${prefix}bansınır](${client.ayarlar.destek})** => **Ban Sınırını Ayarlarsınız.**
      • | **[${prefix}kicksınır](${client.ayarlar.destek})** => **Kick Sınırını Ayarlarsınız.**
      • | **[${prefix}capslock](${client.ayarlar.destek})** => **Büyük Harf Engelini Açarsınız.**
      • | **[${prefix}küfür](${client.ayarlar.destek})** => **Küfür Engel Sistemini Açarsınız.**
      • | **[${prefix}link](${client.ayarlar.destek})** => **Link Engel Sistemini Açarsınız.**
      • | **[${prefix}reklam](${client.ayarlar.destek})** => **Reklam Engel Sistemini Açarsınız.**
      • | **[${prefix}spamengel](${client.ayarlar.destek})** => **Spam Engel Sistemini Açarsınız.**
      • | **[${prefix}modlog](${client.ayarlar.destek})** => **Mod Log Kanalını Ayarlarsınız.**
      • | **[${prefix}muterole](${client.ayarlar.destek})** => **Mute Rolünü Ayarlarsınız.**
      • | **[${prefix}otorol](${client.ayarlar.destek})** => **Otomatik Rol Ayarlarsınız.**
      • | **[${prefix}otorolmesaj](${client.ayarlar.destek})** => **Otomatik Rol Mesajını Ayarlarsınız.**
      • | **[${prefix}saas](${client.ayarlar.destek})** => **Saas Sistemini Açarsınız.**
      • | **[${prefix}sayaç](${client.ayarlar.destek})** => **Sayaç Ayarlarsınız.**
      • | **[${prefix}sayaçhgmesaj](${client.ayarlar.destek})** => **Sayaç Hoş Geldin Mesajını Ayarlarsınız.**
      • | **[${prefix}sayaçbbmesaj](${client.ayarlar.destek})** => **Sayaç Görüşürüz Mesajını Ayarlarsınız.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
          selam.edit(saaa)

        await selam.react("◀️")

        let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
        let geri = selam.createReactionCollector(geriFilter, { time: 30000 });

        geri.on("collect", nbr => {
            nbr.remove()
            selam.edit(yardım)
            sa.remove()
          })
        })

        sunucu.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Sunucu Komutları [9] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}sunucukur normal](${client.ayarlar.destek})** => **Normal Sunucu Kurarsınız.**
      • | **[${prefix}sunucukur destek](${client.ayarlar.destek})** => **Destek Sunucu Kurarsınız.**
      • | **[${prefix}sunucukur gif](${client.ayarlar.destek})** => **Gif Sunucu Kurarsınız. (Yakında)**
      • | **[${prefix}sunucukur kod](${client.ayarlar.destek})** => **Kod Sunucu Kurarsınız.**
      • | **[${prefix}sunucukur botlist](${client.ayarlar.destek})** => **Bot List Sunucu Kurarsınız. (Yakında)**
      • | **[${prefix}sunucukur tasarım](${client.ayarlar.destek})** => **Tasarım Sunucu Kurarsınız. (Yakında)**
      • | **[${prefix}sunucukur youtuber](${client.ayarlar.destek})** => **YouTuber Sunucu Kurarsınız.**
      • | **[${prefix}sunucukur hosting](${client.ayarlar.destek})** => **Hosting Sunucu Kurarsınız. (Yakında)**
      • | **[${prefix}sunucukur public](${client.ayarlar.destek})** => **Public Sunucu Kurarsınız.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            selam.edit(saaa)
  
          await selam.react("◀️")
  
          let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
          let geri = selam.createReactionCollector(geriFilter, { time: 30000 });
  
          geri.on("collect", nbr => {
            nbr.remove()
            selam.edit(yardım)
            sa.remove()
          })
        })


        kayıt.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Kayıt Komutları [11] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}kayıtalınacak](${client.ayarlar.destek})** => **Kayıt Alınacak Rolünü Ayarlarsınız.**
      • | **[${prefix}kayıterkekverilecek](${client.ayarlar.destek})** => **Kayıt Erkek Verilecek Rolünü Ayarlarsınız.**
      • | **[${prefix}kayıtkızverilecek](${client.ayarlar.destek})** => **Kayıt Kız Verilecek Rolünü Ayarlarsınız.**
      • | **[${prefix}kayıtkanal](${client.ayarlar.destek})** => **Kayıt Kanalını Ayarlarsınız.**
      • | **[${prefix}kayıtlog](${client.ayarlar.destek})** => **Kayıt Log Kanalını Ayarlarsınız.**
      • | **[${prefix}kayıttag](${client.ayarlar.destek})** => **Kayıt Tagını Ayarlarsınız.**
      • | **[${prefix}kayıtyetkili](${client.ayarlar.destek})** => **Kayıt Yetkili Rolünü Ayarlarsınız.**
      • | **[${prefix}sestekiler](${client.ayarlar.destek})** => **Seste Bulunan Yetkilileri Gösterir.**
      • | **[${prefix}administatistik](${client.ayarlar.destek})** => **Admin Bilgilerinizi Gösterir.**
      • | **[${prefix}erkek](${client.ayarlar.destek})** => **Belirtilen Kişiyi Erkek Olarak Kayıt Eder.**
      • | **[${prefix}kız](${client.ayarlar.destek})** => **Belirtilen Kişiyi Kız Olarak Kayıt Eder.**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            selam.edit(saaa)
  
          await selam.react("◀️")
  
          let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
          let geri = selam.createReactionCollector(geriFilter, { time: 30000 });
  
          geri.on("collect", nbr => {
            nbr.remove()
            selam.edit(yardım)
            sa.remove()
          })
        })

        nsfw.on("collect", async sa => {
          sa.users.remove(message.author.id)
  
          const saaa = new Discord.MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({dynamic: true}))
      .setColor(client.ayarlar.renk)
      .setDescription(`
      **●▬▬▬▬▬▬▬▬【 Bilgilendirme 】▬▬▬▬▬▬▬▬▬●**
      • | Merhaba ${message.author}, 
      • | ${bilgi[bilgiler]}
  
      **●▬▬▬▬▬▬▬▬【 Nsfw Komutları [8] 】▬▬▬▬▬▬▬▬▬●**
      • | **[${prefix}4k](${client.ayarlar.destek})** => **4K Gif Atar.**
      • | **[${prefix}anal](${client.ayarlar.destek})** => **Anal Gif Atar.**
      • | **[${prefix}ass](${client.ayarlar.destek})** => **Ass Gif Atar.**
      • | **[${prefix}pgif](${client.ayarlar.destek})** => **PGif Atar.**
      • | **[${prefix}hentai](${client.ayarlar.destek})** => **Hentai Gif Atar.**
      • | **[${prefix}holo](${client.ayarlar.destek})** => **Holo Gif Atar.**
      • | **[${prefix}pussy](${client.ayarlar.destek})** => **Pussy Gif Atar.**
      • | **[${prefix}thigh](${client.ayarlar.destek})** => **Thigh Gif Atar.**
      • | **[${prefix}pornhub](${client.ayarlar.destek})** => **Pornhub Üzerinde Araştırma Yapar/Bilgi Edinirsiniz. (Yakında)**
      `)
      .addField("●▬▬▬▬▬▬▬▬【 Bağlantılar 】▬▬▬▬▬▬▬▬▬●", `
      • | [Davet Et](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) • [Destek Sunucusu](${client.ayarlar.destek}) • [Oy Ver](https://top.gg/bot/${client.user.id}/vote) - [Sponsor](https://martihost.com/) | •
      `)

      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
            selam.edit(saaa)
  
          await selam.react("◀️")
  
          let geriFilter = (reaction, user) => reaction.emoji.name === "◀️" && user.id === message.author.id;
          let geri = selam.createReactionCollector(geriFilter, { time: 30000 });
  
          geri.on("collect", nbr => {
            nbr.remove()
            selam.edit(yardım)
            sa.remove()
          })
        })

        x.on("collect", sa => {
          setTimeout(() => {
            selam.reactions.removeAll()
          }, 3000)

          setTimeout(() => {
            selam.delete()
          }, 6000)
        })
  
        setTimeout(() => {
          selam.reactions.removeAll()
          selam.delete()
        }, 40000)
      })


}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"]
}

exports.help = {
  name: "yardım",
  description: "yardım menüsü",
  usage: "w!yardım"
}