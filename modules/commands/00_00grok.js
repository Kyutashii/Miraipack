const axios = require('axios');module.exports.config = {  name: "grok",  version: "1.0.0",  credits: "Maintained and Well-Developed by YenzyJS & Liane",  hasPermission: 0,  commandCategory: "utility",  usage: "[ prefix ]grok_by_yenzyjs_liane [prompt]",  usePrefix: true,  cooldown: 0};module.exports.run = async ({ api, event, args }) => {  try {      const query = args.join(" ");      if (query) {        const processingMessage = await api.sendMessage(`Asking Grok. Please wait a moment...`, event.threadID);        const response = await axios.get(`https://lianeapi.onrender.com/@yenzyjs/api/grok_by_yenzyjs_liane?query=${encodeURIComponent(query)}`);                if (response.data && response.data.message) {          await api.sendMessage({ body: response.data.message.trim() }, event.threadID, event.messageID);          console.log(`Sent Grok's response to the user`);        } else {          throw new Error(`Invalid or missing response from Grok API`);        }        await api.unsendMessage(processingMessage.messageID);      }    } catch (error) {      console.error(`❌ | Failed to get Grok's response: ${error.message}`);      api.sendMessage(`❌ | An error occured. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`, event.threadID);    }  }