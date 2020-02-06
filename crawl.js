const HCCrawler = require('headless-chrome-crawler');
const repositoryfolder = 'tmp/';
const snapfolder = 'snap';
const screenshot = true;

(async () => {
  const crawler = await HCCrawler.launch({
    maxDepth: 4,
    maxConcurrency: 3,
    preRequest: (options => {
      console.log('Requesting:' + options.url);
      let fileName = options.url.replace(/(\.|\/|:|%|#)/g, "_");
      if (fileName.length > 100) {
          fileName = fileName.substring(0, 100);
      }

      if (screenshot && fileName.indexOf('mohela')) {
        options.screenshot = {defaultViewport: { width: 1920, height: 1080 },
          path: repositoryfolder + '/' + fileName + ".png" , fullPage: true
        };
      }
      return true;
    }),
    onSuccess: (result => {
      console.log(`Finished requesting ${result.options.url}.`);
    }),
  });
  await crawler.queue('https://www.example.com/');
  await crawler.onIdle();
  await crawler.close();
})();