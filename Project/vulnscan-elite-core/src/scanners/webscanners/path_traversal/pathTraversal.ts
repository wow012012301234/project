import path from 'path';
import fs from 'fs';
import Crawler from '../../../crawlers/Crawler';

class PathTraversalScanner {
  #crawler;
  #baseTestUrl;

  constructor(baseTestUrl) {
    this.#crawler = new Crawler(baseTestUrl);
    this.#baseTestUrl = baseTestUrl;
  }
  async scan() {
    try {
      
      this.#crawler.startCrawl();

      const filePath = path.join(__dirname, 'dictionary.txt');
      const payloads = fs.readFileSync(filePath, 'utf-8').split('\n').map(payload => payload.trim());
      
      for (const payload of payloads) {
        const testUrl = this.#appendPayloadToUrl(this.#baseTestUrl, payload);
        console.log(testUrl);
        await this.#testPathTraversal(testUrl);
      }

      this.#crawler.finishCrawl();
    } catch (error) {
      console.error(error);
    }
  }

  #appendPayloadToUrl(baseUrl, payload) {
    const url = new URL(baseUrl);

        // check each parameter for a value that ends with '.' and has any extension
        for (const [paramName, paramValue] of url.searchParams) {
      if (paramValue && paramValue.endsWith('.') && /\.[a-zA-Z]+$/.test(paramValue)) {
        url.searchParams.set(paramName, `./${payload}`);
        return url.toString();
      }
    }
    
}

  async #testPathTraversal(url) {
    try {
      const response = await this.#crawler.fetchEndpoint(url);

      console.log(`URL: ${url}, Status: ${response.statusCode}`);
    } catch (error) {
      console.error(`Error testing path traversal for URL: ${url}`, error);
    }
  }
}


const testurl = 'http://testphp.vulnweb.com'; 
const scanner = new PathTraversalScanner(testurl);
scanner.scan();

export default PathTraversalScanner;
