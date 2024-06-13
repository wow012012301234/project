import HTTPClient from "../client/HTTPClient";
import HTTPClientConfig from "../client/HTTPClientConfig";
import HtmlParser from "../utils/parsers/HtmlParser";
import { HTTPRequest, HTTPResponse } from "../client/types";

class Crawler {
	#httpClient: HTTPClient;
	#successRequests: Map<string, HTTPResponse> = new Map();
	#failedRequests: Map<string, string> = new Map();
	#entrypoint: string;
	#crawlStatus: 'working' | 'stopped' | 'finished' = 'working';
	#queuedRequests: Array<string>;
	#policy: RegExp[];

	constructor(entrypoint: string, policy?: RegExp[], httpClientConfig?: HTTPClientConfig) {
		this.#entrypoint = entrypoint;
		this.#queuedRequests = [this.#entrypoint];
		this.#httpClient = new HTTPClient(httpClientConfig);
		this.#policy = policy || [];
	}

	startCrawl() {
		this.#crawlStatus = 'working';
		this.#crawl();
	}

	stopCrawl() {
		this.#crawlStatus = 'stopped';
	}

	continueCrawl() {
		this.#crawlStatus = 'working';
		this.#crawl();
	}

	finishCrawl() {
		this.#crawlStatus = 'finished';
		this.#queuedRequests = [];
	}

	get status(): 'working' | 'stopped' | 'finished' {
		return this.#crawlStatus;
	}

	#isVisitedEndpoint(currentUrl: string): boolean {
		return this.#successRequests.has(currentUrl) || this.#failedRequests.has(currentUrl);
	}

	async #crawl() {
		while (this.#queuedRequests.length > 0 && this.#crawlStatus === 'working') {
			const currentUrl = this.#queuedRequests.shift();

			if (currentUrl && !this.#isVisitedEndpoint(currentUrl)) {
				try {
					const response: HTTPResponse = await this.fetchEndpoint(currentUrl);
					this.#successRequests.set(currentUrl, response);

					if (response.headers?.['content-type']?.includes('text/html')) {
						const htmlParser = new HtmlParser(response.body, currentUrl);
						const links = Array.from(htmlParser.links);

						links.forEach((link) => {
							if (!this.#isVisitedEndpoint(link) && this.#isPolicySatisfied(link)) {
								this.#queuedRequests.push(link);
							}
						});
					}
				} catch (error) {
					this.#failedRequests.set(currentUrl, (error as Error).message);
				}
			}
		}
		this.#crawlStatus = 'finished';
	}

	async fetchEndpoint(url: string): Promise<HTTPResponse> {
		try {
			const request: HTTPRequest = {
				method: 'GET',
				url,
			};
			return await this.#httpClient.request(request);
		} catch (error) {
			throw error;
		}
	}

	#isPolicySatisfied(url: string): boolean {
		return this.#policy.some((regex) => regex.test(url));
	}

	get successRequests(): Map<string, HTTPResponse> {
		return this.#successRequests;
	}

	get failedRequests(): Map<string, string> {
		return this.#failedRequests;
	}
}

export default Crawler;
