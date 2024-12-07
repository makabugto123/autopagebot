const axios = require('axios');

module.exports = {
  name: 'aidetect',
  description: 'Detect if the generated text is an ai or human!',
  author: 'Dale Mekumi', 
  usage: 'aidetect texthere',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "𝑼𝒔𝒂𝒈𝒆: 𝒂𝒊𝒅𝒆𝒕𝒆𝒄𝒕 𝒕𝒆𝒙𝒕𝒉𝒆𝒓𝒆" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ 𝓓𝓮𝓽𝓮𝓬𝓽𝓲𝓷𝓰 𝓐𝓘 𝓟𝓵𝓮𝓪𝓼𝓮 𝓦𝓪𝓲𝓽..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/aidetector?q=${encodeURIComponent(prompt)}`);
      const datas = response.data.data;
      //const ai = response.data.ai;
     // const textword = response.data.textWords;
      const feedback = datas.feedback;
      
      const responseTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

      sendMessage(senderId, { 
        text: `𝘼𝙄 𝘿𝙀𝙏𝙀𝘾𝙏𝙊𝙍\n\n𝐹𝑒𝑒𝒹𝒷𝒶𝒸𝓀: ${feedback}\n\n⏰ 𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮: ${responseTime}\n\n` 
      }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
