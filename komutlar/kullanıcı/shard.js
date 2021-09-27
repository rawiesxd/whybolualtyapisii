const Discord = require('discord.js')
const chalk = require('chalk')
const moment = require('moment');
require('moment-duration-format');

exports.run = async (client, message, args) => {
 try {
   
    const botuptime = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
let shardinfo = {
        ping: await client.shard.fetchClientValues('ws.ping'),
        server_count: await client.shard.fetchClientValues('guilds.cache.size'),
        user_count: await client.shard.fetchClientValues('users.cache.size'),
        uptime: await client.shard.fetchClientValues("uptime"),
        channel: await client.shard.fetchClientValues("channels.cache.size")
    }
  let i = client.shard.ids
  let guildSize = await client.shard.fetchClientValues('guilds.cache.size')
  let guildWhySize = guildSize.reduce((acc, guildCount) => acc + guildCount, 0)

  let usersSize = await client.shard.fetchClientValues('users.cache.size')
  let usersWhySize = usersSize.reduce((acc, userCount) => acc + userCount, 0)
 
  let channelsSize = await client.shard.fetchClientValues('channels.cache.size')
  let channelsWhySize = channelsSize.reduce((acc, channelsCount) => acc + channelsCount, 0)
  /*let kalp;
  if(shardinfo.ping[i] > 500) kalp = `:red_heart:`
  if(shardinfo.ping[i] > 200) kalp = `:yellow_heart:`
  if(shardinfo.ping[i] > 150) kalp = `:blue_heart:`*/
  const promises = [
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
];
    Promise.all(promises).then(results => {
		const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
	let shardembed = new Discord.MessageEmbed()
    .setAuthor('WhYBoLu Shard Bilgi', message.author.avatarURL({ dynamic: true }))
    .setDescription(`• Toplam Sunucu Sayısı: **${guildWhySize}**\n• Toplam Kullanıcı Sayısı: **${usersWhySize.toLocaleString()}**/**${totalMembers.toLocaleString()}**\n• Toplam Kanal Sayısı: **${channelsWhySize.toLocaleString()}**\n• Ping: **${client.ws.ping}ms**\n• Uptime: **${botuptime}**`)
    .setThumbnail(client.user.avatarURL())
    .setTimestamp()
    .setFooter(`Bu Sunucunun Shardı: ${message.guild.shardID + 1}`, message.author.avatarURL({ dynamic: true }))
    .setColor('BLUE')
    for(i=0;i<client.shard.count;i++) {
        shardembed.addField(`• Shard ${i+1} ${shardinfo.ping[i] > 500 ?  ":heart:" : shardinfo.ping[i] > 200 ? ":yellow_heart:" : shardinfo.ping[i] > 150 ? ":blue_heart:" :  ":blue_heart:"}`, `• Ping: **${Math.round(shardinfo.ping[i])}ms**\n• Sunucu: **${shardinfo.server_count[i]}**\n• Kullanıcı Sayısı: **${shardinfo.user_count[i]}**\n• Kanal Sayısı: **${shardinfo.channel[i]}**\n• Uptime: **${moment.duration(shardinfo.uptime[i]).format(`D [Gün] , H [Saat], m [Dakika], s [Saniye]`)}**`, true)
    }
    message.channel.send(shardembed)
	})
    
       }   catch (error) {
    console.log(error)
 }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["shardbilgi"],
  permLevel: 0,
  kategori: "bot",
};

exports.help = {
  name: 'shard',
  description: 'Botun shard bilgisini gösterir.',
  usage: 'shard',

};