module.exports.config = {
	name: "help",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Kyle",
	description: "Guide for new users",
	commandCategory: "use prefix",
	usages: "see all commands",
	cooldowns: 5,
	envConfig: {
		autoUnsend: false,
		delayUnsend: 60
	}
};

	const mathSansBold = {
	 'a': '𝑎', 'b': '𝑏', 'c': '𝑐', 'd': '𝑑', 'e': '𝑒', 'f': '𝑓', 'g': '𝑔', 'h': 'ℎ',
    'i': '𝑖', 'j': '𝑗', 'k': '𝑘', 'l': '𝑙', 'm': '𝑚', 'n': '𝑛', 'o': '𝑜', 'p': '𝑝', 'q': '𝑞',
    'r': '𝑟', 's': '𝑠', 't': '𝑡', 'u': '𝑢', 'v': '𝑣', 'w': '𝑤', 'x': '𝑥', 'y': '𝑦', 'z': '𝑧',
    'A': '𝐴', 'B': '𝐵', 'C': '𝐶', 'D': '𝐷', 'E': '𝐸', 'F': '𝐹', 'G': '𝐺', 'H': '𝐻', 'I': '𝐼',
    'J': '𝐽', 'K': '𝐾', 'L': '𝐿', 'M': '𝑀', 'N': '𝑁', 'O': '𝑂', 'P': '𝑃', 'Q': '𝑄', 'R': '𝑅',
    'S': '𝑆', 'T': '𝑇', 'U': '𝑈', 'V': '𝑉', 'W': '𝑊', 'X': '𝑋', 'Y': '𝑌', 'Z': '𝑍'
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("commands") != 0) return;
	const splitBody = body.slice(body.indexOf("commands")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermission == 0) ? getText("user") : (command.config.hasPermission == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = async function ({ api, event, args }) {
	const uid = event.senderID;
	const userName = (await api.getUserInfo(uid))[uid].name;

	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	const categories = new Set();
	const categorizedCommands = new Map();

	for (const [name, value] of commands) {
		const categoryName = value.config.commandCategory;
		if (!categories.has(categoryName)) {
			categories.add(categoryName);
			categorizedCommands.set(categoryName, []);
		}
		categorizedCommands.get(categoryName).push(`│ ➥ ${value.config.name}`);
	}

	let msg = `➤ 𝙕𝙀𝙋𝙃𝙔𝙍𝙐𝙎 𝘽𝙊𝙏ツ\n\n𝗛𝗲𝘆 𝗭𝗲𝗻𝗽𝗮𝗶 ${userNameTag}, ᴛʜᴇsᴇ  ᴀʀᴇ  ᴄᴏᴍᴍᴀɴᴅs  ᴛʜᴀᴛ  ᴍᴀʏ  ʜᴇʟᴘ  ʏᴏᴜ:\n`;

	for (const categoryName of categories) {
		const categoryNameSansBold = categoryName.split("").map(c => mathSansBold[c] || c).join("");
		msg += `╭─◉ ${categoryNameSansBold}\n`;
		msg += categorizedCommands.get(categoryName).join("\n");
		msg += "\n╰───────────◉\n";
	}

	const randomQuotes = [
	"Octopuses have three hearts: two pump blood to the gills, and one pumps it to the rest of the body.",
		"Honey never spoils; archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old.",
		"The world's oldest known recipe is for beer.",
		"Bananas are berries, but strawberries are not.",
		"Cows have best friends and can become stressed when they are separated.",
		"The shortest war in history was between Britain and Zanzibar on August 27, 1896; Zanzibar surrendered after 38 minutes.",
		"The average person walks the equivalent of three times around the world in a lifetime.",
		"Polar bears are left-handed.",
		"The unicorn is Scotland's national animal.",
		"A group of flamingos is called a 'flamboyance'.",
		"There are more possible iterations of a game of chess than there are atoms in the known universe.",
		"The smell of freshly-cut grass is actually a plant distress call.",
		"A day on Venus is longer than its year.",
		"Honeybees can recognize human faces.",
		"Wombat poop is cube-shaped.",
		"The first oranges weren't orange.",
		"The longest time between two twins being born is 87 days.",
		"A bolt of lightning is six times hotter than the sun.",
		"A baby puffin is called a puffling.",
		"A jiffy is an actual unit of time: 1/100th of a second.",
		"The word 'nerd' was first coined by Dr. Seuss in 'If I Ran the Zoo'.",
		"There's a species of jellyfish that is biologically immortal.",
		"The Eiffel Tower can be 6 inches taller during the summer due to the expansion of the iron.",
		"The Earth is not a perfect sphere; it's slightly flattened at the poles and bulging at the equator.",
		"A hummingbird weighs less than a penny.",
		"Koalas have fingerprints that are nearly identical to humans'.",
		"There's a town in Norway where the sun doesn't rise for several weeks in the winter, and it doesn't set for several weeks in the summer.",
		"A group of owls is called a parliament.",
		"The fingerprints of a koala are so indistinguishable from humans' that they have on occasion been confused at a crime scene.",
		"The Hawaiian alphabet has only 13 letters.",
		"The average person spends six months of their life waiting for red lights to turn green.",
		"A newborn kangaroo is about 1 inch long.",
		"The oldest known living tree is over 5,000 years old.",
		"Coca-Cola would be green if coloring wasn't added to it.",
		"A day on Mars is about 24.6 hours long.",
		"The Great Wall of China is not visible from space without aid.",
		"A group of crows is called a murder.",
		"There's a place in France where you can witness an optical illusion that makes you appear to grow and shrink as you walk down a hill.",
		"The world's largest desert is Antarctica, not the Sahara.",
		"A blue whale's heart is so big that a human could swim through its arteries.",
		"The longest word in the English language without a vowel is 'rhythms'.",
		"Polar bears' fur is not white; it's actually transparent.",
		"The electric chair was invented by a dentist.",
		"An ostrich's eye is bigger than its brain.",
		"Wombat poop is cube-shaped."
	];

	const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

	msg += `├─────❖\n│ » 𝗧𝗼𝘁𝗮𝗹  𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀 ☞ [ ${commands.size} ]\n│ツ𝙆𝙔𝙇𝙀𝙋𝙊𝙂𝙄༆\n╰──────────☯︎\n\n📌 𝗥𝗔𝗡𝗗𝗢𝗠 𝗙𝗔𝗖𝗧: ${randomQuote}`;

	return api.sendMessage(msg, threadID, async (error, info) => {
		if (autoUnsend) {
			await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
			return api.unsendMessage(info.messageID);
		} else return;
	});
};
