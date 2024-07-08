const fs = require('fs');

module.exports.config = {
	name: "file",
	version: "2.4.3",
	hasPermssion: 2,
	credits: "Kyle",
	description: "send script file",
	commandCategory: "𝗢𝗪𝗡𝗘𝗥",
	usages: "{p}file name of your command {filename}.j",
	cooldowns: 5
};

module.exports.run = async function ({ message, args, api, event }) {
	const permission = ["100052395031835"];
	if (!permission.includes(event.senderID)) {
		return api.sendMessage("⛔ 𝙔𝙤𝙪 𝙙𝙤𝙣'𝙩 𝙝𝙖𝙫𝙚 𝙥𝙚𝙧𝙢𝙞𝙨𝙨𝙞𝙤𝙣 𝙩𝙤 𝙪𝙨𝙚 𝙩𝙝𝙞𝙨 𝙘𝙤𝙢𝙢𝙖𝙣𝙙. (๑•̀д•́๑)", event.threadID, event.messageID);
	}

	const fileName = args[0];
	if (!fileName) {
		return api.sendMessage("⚠️ 𝙋𝙡𝙚𝙖𝙨𝙚  𝙥𝙧𝙤𝙫𝙞𝙙𝙚 𝙖 𝙛𝙞𝙡𝙚 𝙣𝙖𝙢𝙚.", event.threadID, event.messageID);
	}

	const filePath = __dirname + `/${fileName}.js`;
	if (!fs.existsSync(filePath)) {
		return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
	}

	const fileContent = fs.readFileSync(filePath, 'utf8');
	api.sendMessage({ body: fileContent }, event.threadID);
};
