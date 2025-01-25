const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'humanizer',
  description: 'Humanize the AI Generated Text With AI DETECTOR',
  usage: 'Humanizer [AI-generated text here]',
  author: 'coffee',

  async execute(senderId, args, pageAccessToken) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "Usage: humanizer Your AI-generated text here" }, pageAccessToken);

    try {
       const response = await axios.get(`https://kaiz-apis.gleeze.com/api/humanizer?q=${encodeURIComponent(prompt)}`);
      const mess = response.data.response;
      
      const response1 = await axios.get(`https://kaiz-apis.gleeze.com/api/aidetector?q=${encodeURIComponent(mess)}`);
      const dat = response1.data.data;
      const isHuman = dat.isHuman;
      const aiWords = dat.aiWords;
      const feedback = dat.feedback;
      
      const mess1 = `🤖 𝗛𝗨𝗠𝗔𝗡𝗜𝗭𝗘𝗥\n━━━━━━━━━━━━━━━━━━\nResponse:\n\n${mess}\n\n🤖 𝗔𝗜 𝗗𝗘𝗧𝗘𝗖𝗧𝗢𝗥\n━━━━━━━━━━━━━━━━━━\n💌𝙈𝙚𝙨𝙨𝙖𝙜𝙚: ${feedback}\n👭𝙄𝙎𝙃𝙐𝙈𝘼𝙉: ${isHuman}\n🤖𝗜𝗦 𝗔𝗜: ${aiWords}\n`
      
      
      const parts = [];

            for (let i = 0; i < mess1.length; i += 1999) {
                parts.push(mess.substring(i, i + 1999));
            }

            // send all msg parts
            for (const part of parts) {
                await sendMessage(senderId, { text: part }, pageAccessToken);
            }
      
      //sendMessage(senderId, { text: data.response }, pageAccessToken);
    } catch {
      sendMessage(senderId, { text: 'There was an error generating the content. Please try again later.' }, pageAccessToken);
    }
  }
};
