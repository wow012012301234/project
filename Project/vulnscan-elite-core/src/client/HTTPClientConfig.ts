interface HTTPClientConfig {
	client: "axios" | "puppeteer";
	proxyUrl?: string;
}

export default HTTPClientConfig
