const axios = require('axios');
require('dotenv').config();
async function callAPI(ipList) {

    // 过滤掉空字符串
    let filteredList = ipList.filter(ip => ip.trim() !== '');

    if (filteredList.length === 0) {

        console.log('所有 IP 都可达，无需调用接口。');
        return;
    }

    const url = process.env.API_URL; // 注意 URL 添加了 `http://`
    const data = JSON.stringify({
        mobile: process.env.PHONE_NUMBER, // 测试手机号，可替换为实际需要发送的号码
        content: `服务器${ipList.join(', ')}已无法访问,请及时处理！`, // 动态内容
        systemName: '统一服务系统',
        type: 1,
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    try {
        const response = await axios.request(config);
        console.log('短信接口调用成功，返回数据：', JSON.stringify(response.data));
    } catch (error) {
        console.error('短信接口调用失败：', error.message);
    }
}

module.exports = { callAPI };
