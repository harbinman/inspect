const ping = require('ping');
require('dotenv').config();

async function pingIPs() {
    const ips = process.env.IPS.split(','); // 从 .env 文件中读取 IP 列表
    const unreachableIPs = [];

    for (const ip of ips) {
        const res = await ping.promise.probe(ip); // 逐个 Ping
        if (!res.alive) {
            unreachableIPs.push(ip); // 如果不可达，加入结果列表
        }
    }
    return unreachableIPs;
}

module.exports = { pingIPs };
