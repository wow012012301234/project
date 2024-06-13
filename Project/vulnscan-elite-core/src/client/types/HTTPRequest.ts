type HTTPRequest = {
	method: string;
	url: string;
	headers?: Record<string, string>;
	body?: any;
	
}
export default HTTPRequest
