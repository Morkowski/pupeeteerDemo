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
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(baseUrl);
        await page.waitFor(3000);

        const screenshotFolderPath = `screenshots/${version}`;
        const screenshotName = 'home.png';
        const screenshotPath = `${screenshotFolderPath}/${screenshotName}`

        mkdirp(screenshotFolderPath);
        await page.screenshot({ path: screenshotPath });
        await browser.close();
    } catch(error) {
        console.error(`Something went wrong: ${error}`);
    }
})();
