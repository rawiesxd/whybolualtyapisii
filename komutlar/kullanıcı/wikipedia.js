const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
exports.run = async(client, message, args) => {
		if(db.has(`üyelikk_${message.author.id}`)) {
        const fetch = require("node-fetch");
		if(!message.channel.nsfw === true) return message.channel.send("+18 Konular araştırılmasın diye bu komutu bir NSFW kanalda kullanmanız gerekli.")
        if(!args.join(" ")) return message.channel.send("Lütfen aratılacak şeyi yazın!")
		const originLink = "https://tr.wikipedia.org";
            const link = new URL("/w/api.php", originLink);
            link.search = new URLSearchParams({
                action: "query",
                titles: args.join(" "),
                prop: "extracts",
                exintro: true,
                explaintext: true,
                format: "json",
            }).toString();
            const linkOptions = {
                method: "GET",
                headers: {"Accept": "application/json"}
            };
            
            const res = await fetch(link, linkOptions);
            if (!res.ok) throw `Hata çıktı!\n\`${res.status}\`, \`${res.statusText}\`, \`${res.error}\``;
            const { query } = await res.json();
			
            const charCheck = (str, max = 2048) => (str.length > max) ? str.slice(0, max - 3) + "..." : str;
            for (const key in query.pages) {
                const element = query.pages[key];

                const embed = new MessageEmbed()
					.setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
                    .setTitle(element.title)
                    .setColor(client.ayarlar.embedRenk)//charCheck(element.extract)
                    .setDescription(charCheck(element.extract))//info.substring(0,info.length > 2000 ? info.indexOf(". ", 1850) : info.length) + `...\n\n**Read More -> ${page.raw.fullurl}**`
                    .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({dynamic: true}));
                message.channel.send(embed);
            }	
		} else {
	const embed = new MessageEmbed()
      .setAuthor(`${client.ayarlar.botİsim} Bot`, message.author.avatarURL({ dynamic: true }))
      .setColor(client.ayarlar.embedRenk)
	  .setDescription(`Selam ${message.author}, eğer **${exports.help.name}** Adlı komutu kullanmak istiyorsan **Gold Üye** Olman lazım!\nSatın almak için: [Destek Sunucum](${client.ayarlar.destek})`)
      .setFooter(client.ayarlar.embedFooter, message.author.avatarURL({ dynamic: true }))
    message.channel.send(embed);
		}
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: []
}

exports.help = {
name: "wikipedia"
}