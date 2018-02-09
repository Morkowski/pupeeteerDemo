const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');
const { getPublishInfo } = require('./helpers');

(async () => {
    const baseUrl = 'https://streaming.simplitv.at';

    try {
        const publishinfo = await getPublishInfo(baseUrl);
        const version = publishinfo.version;
        const currentTime = new Date();
        console.log(`measure datetime: ${currentTime}`)
        console.log(version);
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const tick = Date.now();
        await page.goto(baseUrl);

        const loadTime = await page.evaluate(() => {
            const { loadEventEnd, navigationStart } = performance.timing;
            return loadEventEnd - navigationStart;
        });

        console.log(`loaded in ${loadTime} ms`);

        const screenshotFolderPath = `screenshots/${version}`;
        const screenshotName = 'home.png';
        const screenshotPath = `${screenshotFolderPath}/${screenshotName}`;

        mkdirp(screenshotFolderPath);
        await page.screenshot({ path: screenshotPath });
        await browser.close();
    } catch(error) {
        console.error(`Something went wrong: ${error}`);
    }
})();
