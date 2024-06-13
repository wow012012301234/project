import * as cheerio from 'cheerio';
import Parser from './Parser';

class XmlParser extends Parser {

	#$: cheerio.CheerioAPI

	constructor(body: string) {
		super(body)
		this.#$ = cheerio.load(body, { xml: true, xmlMode: true })
	}

	getNodeBySelector(selector: string): cheerio.Cheerio<cheerio.AnyNode> {
		return this.#$(selector)
	}

}

export default XmlParser
