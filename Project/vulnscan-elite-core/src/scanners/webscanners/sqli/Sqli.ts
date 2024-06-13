import Crawler from '../../../crawlers/Crawler'
import HTTPClient from '../../../client/HTTPClient'
import HTTPClientConfig from '../../../client/HTTPClientConfig'
import { HTTPResponse, HTTPRequest } from '../../../client/types'
import HtmlParser from '../../../utils/parsers/HtmlParser'
import { readFileSync } from 'fs'
import { resolve } from 'path'

class Sqli {
  private sqlErrors: string[]
  private httpClient: HTTPClient
  private payloads: string[]

  constructor( httpClientConfig?: HTTPClientConfig) {
    this.httpClient = new HTTPClient(
      httpClientConfig || {
        client: 'axios'
      }
    )

    const baseDir = './src/scanners/webscanners/sqli'
    const ErrorPath = resolve(baseDir, 'txt/sql_errors.txt')
    const payloadPath = resolve(baseDir, 'txt/payloads.txt')

    this.sqlErrors = readFileSync(ErrorPath, 'utf-8').split('\n')
    this.payloads = readFileSync(payloadPath, 'utf-8').split('\n')

  }

  async #getFormsFromCrawler(crawler: Crawler): Promise<any[]> {
    try {
      crawler.startCrawl()

      while (crawler.status === 'working') {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      const forms: any[] = []
      crawler.successRequests.forEach((response: HTTPResponse, url: string) => {
        console.log('Processing response for URL:', url)
        if (response.headers?.['content-type']?.includes('text/html')) {
          const htmlParser = new HtmlParser(response.body, url)
          const responseForms = Array.from(htmlParser.forms)
          forms.push(...responseForms)
        }
      })

      return forms
    } catch (error) {
      console.error('Error during crawl:', (error as Error).message)
      return []
    }
  }

  #vulnerable(response: HTTPResponse): boolean {
    const content = response?.body?.toLowerCase()
    for (const error of this.sqlErrors) {
      if (content?.includes(error.toLowerCase())) {
        return true
      }
    }
    return false
  }

  public async sqlInjectionScan(url: string): Promise<void> {
    try {
      const crawler = new Crawler(url)
      const forms = await this.#getFormsFromCrawler(crawler)
      console.log(`[+] Detected ${forms.length} forms on ${url}`)
      for (const form of forms) {
        for (const c of this.payloads) {
          const data: Record<string, string> = {}
          for (const inputElement of form.parameters) {
            if (inputElement.type === 'hidden' || inputElement.value) {
              data[inputElement.name || ''] = (inputElement.value || '') + c
            } else if (inputElement.type !== 'submit') {
              data[inputElement.name || ''] = `${c}`
            }
          }

          const absoluteAction = new URL(form.action, url).href

          try {
            const request: HTTPRequest = {
              method: form.method || 'POST',
              url: absoluteAction,
              headers: {
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
              },
              body: data
            }
            const res = await this.httpClient.request(request)

            if (res && res.body) {
              if (this.#vulnerable(res)) {
                console.log('SQL Injection attack vulnerability detected in link:', absoluteAction)
                break
              } else {
                /*Do Nothing */
              }
            } else {
              console.error('Error: Response or response data is undefined')
            }
          } catch (error) {
            console.error('Error during request:', (error as Error).message)
          }
        }
      }
    } catch (error) {
      console.error('Error during SQL injection scan:', (error as Error).message)
    }
  }
}

export default Sqli

