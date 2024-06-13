import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import puppeteer, { Page, Browser } from "puppeteer";
import HTTPClientConfig from "./HTTPClientConfig";
import { HTTPRequest, HTTPResponse } from "./types";
class HTTPClient {
	#client?: AxiosInstance | Browser = undefined;
	#config?: HTTPClientConfig = undefined;

	constructor(config?: HTTPClientConfig) {
		this.#config = config;
		switch (config?.client) {
			case "axios":
				this.#setupAxios();
				break;
			case "puppeteer":
				this.#setupPuppeteer();
				break;
			default:
				this.#config = { client: "axios", proxyUrl: this.#config?.proxyUrl }
				this.#setupAxios();
		}
	}

	#setupAxios() {
		const axiosConfig: AxiosRequestConfig = {};

		if (this.#config?.proxyUrl) {
			const proxyConfig = new URL(this.#config.proxyUrl);
			axiosConfig.proxy = {
				protocol: proxyConfig.protocol,
				host: proxyConfig.hostname,
				port: parseInt(proxyConfig.port),
			};
		}

		this.#client = axios.create(axiosConfig);
	}

	async #setupPuppeteer() {

		// setup headless false for debuging and testing
		const launchOptions = {
			headless: true,
			defaultViewport: {
				width: 1280,
				height: 1024,
			},
			args: [""]
		};

		if (this.#config?.proxyUrl) {
			launchOptions.args = [`--proxy-server=${this.#config.proxyUrl}`];
		}

		this.#client = await puppeteer.launch(launchOptions);

	}

	async request(req: HTTPRequest): Promise<HTTPResponse> {
		try {
			req.method = req.method.toUpperCase()
			if (this.#config?.client === "axios") {
				const axiosResponse = await (this.#client as AxiosInstance).request({
					method: req.method,
					url: req.url,
					headers: req.headers,
					data: req.body,
					validateStatus: (_) => true,
					maxRedirects: 1000,
					timeout: 1000 * 1000,
				});

				const headers: Record<string, string> = {};
				for (const [key, value] of Object.entries(axiosResponse.headers)) {
					headers[key] = value as string;
				}

				return {
					statusCode: axiosResponse.status,
					headers,
					body: axiosResponse.data,
				};
			} else if (this.#config?.client === "puppeteer" && this.#client instanceof Browser) {
				const page: Page = await this.#client.newPage();

				try {
					page.setDefaultTimeout(1000 * 1000)
					if (req.method !== "GET" || req.body || req.headers) {
						page.setRequestInterception(true)
						page.on('request', request => {
							if (request.isNavigationRequest() && request.redirectChain.length > 0) {
								request.continue()

							} else {
								const overrides = {
									method: req.method,
									url: req.url,
									headers: req.headers,
									postData: req.body,
								}

								request.continue(overrides);
							}
						});
					}

					const puppeteerResponse = await page.goto(req.url, { waitUntil: "domcontentloaded" });

					const headers: Record<string, string> = {};
					if (puppeteerResponse && puppeteerResponse.headers) {
						for (const header of Object.entries(puppeteerResponse.headers())) {
							const [key, value] = header;
							headers[key] = value;
						}
					}

					const body = await page.content()
					const statusCode = puppeteerResponse?.status() || 200

					await page.close()
					return {
						statusCode,
						headers,
						body,
					};
				} catch (err) {
					page.close()
					throw err
				}
			} else {
				throw new Error("Invalid client type");
			}
		} catch (error) {
			throw error;
		}
	}
}

export default HTTPClient
