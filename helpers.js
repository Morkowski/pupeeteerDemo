const https = require('https');

const getPublishInfo = async (baseUrl) => {
    const publishInfoUrl = `${baseUrl}/publishinfo.json`;

    return new Promise((resolve, reject) => {
        https.get(publishInfoUrl, (resp) => {
                let data = '';
                resp.on('data', (chunk) => { data += chunk;});
                resp.on('end', () => resolve(JSON.parse(data)));
        }).on("error", (err) => { reject(err) });
    })
};

exports.getPublishInfo = getPublishInfo;
