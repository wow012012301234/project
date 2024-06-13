const ZapClient = require("zaproxy")

class ZapScanner {
	#zapClient: any
	constructor(apiKey: string, host: string, port: string) {
		this.#zapClient = new ZapClient({ apiKey, proxy: { host, port } })
	}

	async crawl(url: string): Promise<number> {
		const spiderScanId = await this.#zapClient.spider.scan({ url, recurse: true });
		return spiderScanId
	}

	async crawlStatus(spiderScanId: number): Promise<number> {
		const crawlStatus = parseInt((await this.#zapClient.spider.status(spiderScanId)).status)
		return crawlStatus
	}

	async activeScan(url: string): Promise<number> {
		const scanId = await this.#zapClient.ascan.scan({ url, recurse: true });
		return scanId
	}

	async activeScanStatus(activeScanId: number, url: string): Promise<object> {
		const progress = parseInt((await this.#zapClient.ascan.status(activeScanId)).status);
		const alerts = await this.#zapClient.core.alerts({ baseurl: url });
		return {
			status: progress,
			result: alerts
		}
	}
}
