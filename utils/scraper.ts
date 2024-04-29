import { Dataset, CheerioCrawler } from "crawlee";
import type { Device } from "@/app/device/[slug]/page";
import type Cheerio from "cheerio";

const convertToDevice = (obj: any): Device => {
    const device: Device = {
        slug: obj.slug, // Create slug from Name/Version
        title: obj['Name/Version:'],
        author: obj['Author:'],
        authorUrl: '', // TODO
        image: '', // TODO 
        description: obj['Description:'],
        tags: obj['Tags:'],
        liveVersion: obj['Live Version Used:'],
        maxVersion: obj['Max Version Used:'],
        dateAdded: new Date(obj['Date Added:']),
        lastUpdated: obj['Date Last Updated:'] ? new Date(obj['Date Last Updated:']) : undefined,
        rating: obj.rating.trim(), // Trim any whitespace
        type: obj['Device Type:'],
        downloads: parseInt(obj['Downloads:'], 10),
        downloadUrl: obj.downloadUrl,
        url: obj['URL (optional):'],
        license: obj['License (more info):']
    };

    return device;
}

const extractFromTrs = ($: typeof Cheerio, e: cheerio.Cheerio): Record<string, string> => {
  const deets: Record<string, string> = {};
  e.each((i, e) => {
    let key = $(e).find('td:nth-child(1)').text();
    if (key.toLowerCase().includes("rating")) {
      key = 'rating';
    } else if (key.toLowerCase().includes("download url")) {
      key = 'downloadUrl';
    }
    const value = $(e).find('td:nth-child(2)').text();
    deets[key] = value;
  });
  return deets;
};

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 20,
  // Function called for each URL
  async requestHandler({ $, request, enqueueLinks, log }) {
    log.info(request.url);

    if (request.url.includes('device')) {
      const overview = $("table:nth-child(3)").find("tr")
      const details = $("table:nth-child(6)").find("tr");
      const deets = { ...extractFromTrs($, overview), ...extractFromTrs($, details) };
      details.each((i, e) => {
        let key = $(e).find('td:nth-child(1)').text();
        if (key.toLowerCase().includes("rating")) {
          key = 'rating';
        } else if (key.toLowerCase().includes("download url")) {
          key = 'downloadUrl';
        }
        const value = $(e).find('td:nth-child(2)').text();
        deets[key.trim()] = value;
      });
      const device: Device = convertToDevice({
        slug: request.url.split('/').pop() || deets['title'].toLowerCase().replace(/\s+/g, '-'),
        ...deets
      });
      await Dataset.pushData(device)
    }

    // Add some links from page to the crawler's RequestQueue
    await enqueueLinks({
      globs: ["http?(s)://maxforlive.com/library/**/**"]
    });
  }
});
const main = async () => {
  await crawler.run(["https://maxforlive.com/library/"]);
};

main();
