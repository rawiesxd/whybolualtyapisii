const Discord = require("discord.js");
const db = require("quick.db")
exports.run = async(client, message, args) => {
    if (message.author.id !== "440575579335557121") return message.reply("Sen sahibim değilsin!")
    
    if(!args.length) return message.channel.send(`Lütfen yenilenecek komutu söyleyin.`);

  let command;
  if (client.commands.has(args[1])) {
    command = client.commands.get(args[1]);
  } else if (client.aliases.has(args[1])) {
    command = client.commands.get(client.aliases.get(args[1]));
  }

  if(!command) return message.channel.send(`\`${args[1]}\` Adlı komut bulunamadı!`);

  command = command.help.name;

  delete require.cache[require.resolve(`../../komutlar/${args[0]}/${command}.js`)];
  let cmd = require(`../../komutlar/${args[0]}/${command}`);
  client.commands.delete(command);
  if(cmd.init) cmd.init(client);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
  });
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
    client.aliases.set(alias, cmd.help.name);
  });

  message.channel.send(`\`${command}\` Adlı komut yenilendi.`);
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'yenile',
  description: 'Belirtilen komutu yenler.',
  usage: 'yenile'
};