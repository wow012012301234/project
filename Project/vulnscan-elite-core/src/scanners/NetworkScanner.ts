import { exec } from 'child_process';
import { toJson } from 'xml2json';

import * as fs from "node:fs"

interface NetworkScanResult {
	host: string,
	os: string | undefined,
	ports: PortScanResult[]
}

interface PortScanResult {
	protocol: "tcp" | "udp" | "string",
	portNumber: number,
	service: string,
	cve: string[]
}

export class NetScanner {
	#host: string;
	#scanTime: number;

	constructor(host: string) {
		this.#host = host;
		this.#scanTime = Date.now()
	}

	scan(): Promise<boolean> {
		const nmapCommand = `nmap -sS -sV -sU -O -oX./${this.#host}-${this.#scanTime}.xml --script=vulners -p- ${this.#host}`;

		return new Promise((resolve, reject) => {
			exec(nmapCommand, (error, _stdout, _stderr) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(true);
			});
		});
	}

	get result(): NetworkScanResult | undefined {
		if (fs.existsSync(`./${this.#host}-${this.#scanTime}.xml`)) {
			let xmlReport: string = fs.readFileSync(`./${this.#host}-${this.#scanTime}.xml`, "utf8");
			let jsonReport: object = JSON.parse(toJson(xmlReport));
			if (!jsonReport['nmaprun']['host']) {
				return
			}
			let osName: string = ''
			if (jsonReport['nmaprun']['host']['os'] && jsonReport['nmaprun']['host']['os']['name']) {
				osName = jsonReport['nmaprun']['host']['os']['name'];
			}
			let portsReport: object[] = jsonReport['nmaprun']['host']['ports']['port'];
			let PortScanResults: PortScanResult[] = []
			portsReport?.forEach((port) => {
				let service: string = port['service']['name'];
				let protocol: "tcp" | "udp" = port['protocol'];
				let portNumber = parseInt(port['portid']);
				let cve: string[] = []

				if (port['script'] && port['script']['table'] && port['script']['table']['table']) {

					let vulnersReport: object[] = port['script']['table']['table'];



					vulnersReport.forEach((result: any) => {
						let id: string = ''
						let isCve: boolean = false
						result['elem'].forEach((element: object) => {

							if (element['key'] == "id") {
								id = element['$t']
							}
							if (element['key'] == "type" && element['$t'] == 'cve') {
								isCve = true
							}
						})
						if (isCve) {
							cve.push(id as string)
						}
					})
				}
				PortScanResults.push({
					protocol,
					service,
					portNumber,
					cve
				});
			})
			return {
				host: this.#host,
				os: osName,
				ports:PortScanResults
			}
		}

	}
}

