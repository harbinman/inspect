const { pingIPs } = require('./ping');
const { callAPI } = require('./apiCaller');

async function main() {
    console.log('开始 Ping 测试...');
    const unreachableIPs = await pingIPs();
    if (unreachableIPs.length > 0) {
        console.log('以下 IP 无法访问：', unreachableIPs);
        console.log('开始调用接口...');
        await callAPI(unreachableIPs);
    } else {
        console.log('所有 IP 都可达！');
    }


}

main().catch((error) => {
    console.error('程序运行出错：', error);
});
