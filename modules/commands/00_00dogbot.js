const axios = require('axios');module.exports.config = {  name: "dogbot",  version: "1.0.0",  credits: "Pawsome",  hasPermission: 0,  commandCategory: "utility",  usage: "[ prefix ]dogbot_by_pawsome [prompt]",  usePrefix: true,  cooldown: 0};module.exports.run = async ({ api, event, args }) => {  try {      const query = args.join(" ");      if (query) {        const processingMessage = await api.sendMessage(`Asking DogBot. Please wait a moment...`, event.threadID);        const response = await axios.get(`https://lianeapi.onrender.com/@nealianacagara/api/dogbot_by_pawsome?query=${encodeURIComponent(query)}`);                if (response.data && response.data.message) {          await api.sendMessage({ body: response.data.message.trim() }, event.threadID, event.messageID);          console.log(`Sent DogBot's response to the user`);        } else {          throw new Error(`Invalid or missing response from DogBot API`);        }        await api.unsendMessage(processingMessage.messageID);      }    } catch (error) {      console.error(`❌ | Failed to get DogBot's response: ${error.message}`);      api.sendMessage(`❌ | An error occured. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);    }  }