const axios = require('axios');
const { sendMessage } = require('../handles/sendMessage');

module.exports = {
  name: 'shoti',
  description: 'Generate a random TikTok video.',
  author: 'Jerome',

  async execute(senderId, args, pageAccessToken) {
    try {
      const apiUrl = 'https://kaiz-apis.gleeze.com/api/shoti';
      const response = await axios.get(apiUrl);

      if (response.data && response.data.shoti.videoUrl) {
        const videoUrl = response.data.shoti.videoUrl;

        // Send video attachment only
        const videoMessage = {
          attachment: {
            type: 'video',
            payload: {
              url: videoUrl,
            },
          },
        };
        await sendMessage(senderId, videoMessage, pageAccessToken);
      } else {
        await sendMessage(senderId, {
          text: '⚠️ No video found. Please try again later.',
        }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching TikTok video:', error.message);
      await sendMessage(senderId, {
        text: '⚠️ Sorry, there was an error generating the video. Please try again later.',
      }, pageAccessToken);
    }
  },
};
