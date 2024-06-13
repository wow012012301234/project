import * as cheerio from 'cheerio';
import Parser from './Parser';
import url from 'url';
import { Form, Param } from './types';

class HtmlParser extends Parser {

	#url: string;
	#$: cheerio.CheerioAPI

	constructor(body: string, newUrl?: string) {
		super(body);
		this.#url = newUrl || ''
		this.#$ = cheerio.load(body)
	}

	get links(): Set<string> {

		const links = new Set<string>();

		this.#$('a').each((_, element) => {
			const link = this.#$(element).attr('href');
			if (link) {
				links.add(url.resolve(this.#url, link));
			}
		});

		return links;
	}

	get sourceJsScripts(): Set<string> {
		const scripts = new Set<string>();

		this.#$('script').each((_, element) => {
			const scriptSrc = this.#$(element).attr('src');
			if (scriptSrc) {
				scripts.add(url.resolve(this.#url, scriptSrc));
			}
		});

		return scripts;
	}


	get forms(): Array<Form> {
		const forms: Array<Form> = [];


		this.#$('form').each((_, element) => {
			const form = this.#$(element);
			const action = form.attr('action') || '';
			const method = form.attr('method')?.toUpperCase() || 'GET';
			const parameters: Array<Param> = [];


			form.find('input[name]').each((_, inputElement) => {
				const type = this.#$(inputElement).attr('type') || 'text';
				const name = this.#$(inputElement).attr('name') || '';
				const value = this.#$(inputElement).attr('value') || '';
				parameters.push({ name, value, type});
			});

			forms.push({ url: url.resolve(this.#url, action), action, method, parameters });
		});

		return forms;
	}



	getNodeBySelector(selector: string): cheerio.Cheerio<cheerio.AnyNode> {
		return this.#$(selector)
	}


}
export default HtmlParser
