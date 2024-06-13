import * as net from 'net';
import * as dgram from 'dgram';
import Port from './types/Port';


class PortScanner {
	#openPorts: Array<Port> = [];
	#targetHost: string;

	constructor(targetHost: string) {
		this.#targetHost = targetHost;
	}

	async scanTCPPort(port: number, timeout: number = 1000): Promise<boolean> {
		return new Promise((resolve) => {
			const socket = new net.Socket();

			socket.on('connect', () => {
				this.#openPorts.push({ portType: 'tcp', portNumber: port });
				socket.end();
				resolve(true);
			});

			socket.on('error', (_) => {
				resolve(false);
			});


			socket.setTimeout(timeout, () => {
				socket.end();
				resolve(false);
			});

			socket.connect(port, this.#targetHost);
		});
	}

	async scanUDPPort(port: number): Promise<boolean> {
		return new Promise((resolve) => {
			const socket = dgram.createSocket('udp4');
			socket.on('message', () => {
				this.#openPorts.push({ portType: 'udp', portNumber: port });
				socket.close();
				resolve(true);
			});

			socket.on('error', (_) => {
				resolve(false);
			});

			const message = Buffer.from('Are You Opened? :)');
			socket.send(message, port, this.#targetHost);
		});
	}

	async scanPort(protocol: 'tcp' | 'udp', port: number, timeout: number = 1000): Promise<boolean> {
		if (protocol === 'tcp') {
			return await this.scanTCPPort(port, timeout);
		} else if (protocol === 'udp') {
			return await this.scanUDPPort(port);
		} else {
			return false;
		}
	}

	async scanAllPortsInRange(protocol: 'tcp' | 'udp', startPort: number, endPort: number, timeout: number = 1000): Promise<void> {
		for (let port = startPort; port <= endPort; port++) {
			await this.scanPort(protocol, port, timeout);
		}
	}

	async scanAllPorts(timeout: number = 1000): Promise<void> {
		await this.scanAllPortsInRange('tcp', 1, 65535, timeout);
		await this.scanAllPortsInRange('udp', 1, 65535, timeout);
	}


	get openPorts(): Port[] {
		return this.#openPorts;
	}
}

export default PortScanner;
