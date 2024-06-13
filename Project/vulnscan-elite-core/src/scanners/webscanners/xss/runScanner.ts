import XSSScanner from "./xssscanner";
import  HTTPClientConfig  from '../../client/HTTPClientConfig'; 




// Set up configurations
const httpClientConfig = {
  client : "axios"
};

// Create an instance of the XSSScanner
const xssScanner = new XSSScanner(httpClientConfig as HTTPClientConfig);

// Define target URL and other parameters
const targetUrl = 'https://translate.google.com/'; 

// Run the XSS scan
xssScanner.scanXSS(targetUrl)
  .then(({ riskLevel, scanTime, payloadsFound }) => {
    console.log('XSS Scan Result:');
    console.log(`- Risk Level: ${riskLevel}`);
    console.log(`- Scan Time: ${scanTime} ms`);
    console.log(`- Payloads Found: ${payloadsFound.join(', ') || 'None'}`);
  })
  .catch((error) => {
    console.error('Error during XSS scan:', error);
  });
