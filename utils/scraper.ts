import { PlaywrightCrawler, Dataset, CheerioCrawler } from "crawlee";

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new CheerioCrawler({
  maxRequestsPerCrawl: 5,
  // Function called for each URL
  async requestHandler({ $, request, enqueueLinks, log }) {
    log.info(request.url);

    const title = $(".device .title");
    title.each((i, e) => {
      const link = `<a href="${$(e)
        .find("a")
        .attr("href")}">${$(e).text()}</a>`;
      console.log(link);
    });
    // Add some links from page to the crawler's RequestQueue
    await enqueueLinks({
      globs: ["http?(s)://maxforlive.com/library/*"]
    });
  }
});
const main = async () => {
  // Define the starting URL
  await crawler.addRequests(["https://maxforlive.com/library/"]);
  // Run the crawler
  await crawler.run();
};

main();
