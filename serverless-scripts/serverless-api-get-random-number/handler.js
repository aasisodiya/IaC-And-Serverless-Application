// Author: Akash Sisodiya
'use strict';
//Random Number Generator
function getRandomNumber(queryStringParameters) {
  let min = 0;
  let max = 10;
  if (queryStringParameters != null && queryStringParameters.min != null && queryStringParameters.max != null) {
    max = parseInt(queryStringParameters.max);
    min = parseInt(queryStringParameters.min);
  }
  return 'With Minimum:' + min + ' and Maximum:' + max + ' Your Random Number : ' + (min + Math.floor(Math.random() * (max - min + 1)));
}

module.exports.randomNumber = async event => {
  //parse query string
  let queryStringParameters = event.queryStringParameters;
  // console.log(event);
  //parse headers (Not used here, but just kept for future learning reference)
  // let headers = event.headers;
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: getRandomNumber(queryStringParameters),
      },
      null,
      2
    ),
  };
};


// Sample of data in event object

// {
//   "resource": "/randomnumber",
//   "path": "/randomnumber",
//   "httpMethod": "GET",
//   "headers": {
//       "Accept": "*/*",
//       "Accept-Encoding": "gzip, deflate",
//       "Cache-Control": "no-cache",
//       "CloudFront-Forwarded-Proto": "https",
//       "CloudFront-Is-Desktop-Viewer": "true",
//       "CloudFront-Is-Mobile-Viewer": "false",
//       "CloudFront-Is-SmartTV-Viewer": "false",
//       "CloudFront-Is-Tablet-Viewer": "false",
//       "CloudFront-Viewer-Country": "IN",
//       "headerkey1": "headervalue1",
//       "Host": "randomurl.execute-api.us-east-1.amazonaws.com",
//       "Postman-Token": "askjas-37b8-4f99-9e41-random",
//       "User-Agent": "PostmanRuntime/7.16.3",
//       "Via": "1.1 random.cloudfront.net (CloudFront)",
//       "X-Amz-Cf-Id": "random-random-g==",
//       "X-Amzn-Trace-Id": "Root=1-5d80ba5a-random",
//       "X-Forwarded-For": "10.10.10.10, 10.10.10.10",
//       "X-Forwarded-Port": "443",
//       "X-Forwarded-Proto": "https"
//   },
//   "multiValueHeaders": {
//       "Accept": [
//           "*/*"
//       ],
//       "Accept-Encoding": [
//           "gzip, deflate"
//       ],
//       "Cache-Control": [
//           "no-cache"
//       ],
//       "CloudFront-Forwarded-Proto": [
//           "https"
//       ],
//       "CloudFront-Is-Desktop-Viewer": [
//           "true"
//       ],
//       "CloudFront-Is-Mobile-Viewer": [
//           "false"
//       ],
//       "CloudFront-Is-SmartTV-Viewer": [
//           "false"
//       ],
//       "CloudFront-Is-Tablet-Viewer": [
//           "false"
//       ],
//       "CloudFront-Viewer-Country": [
//           "IN"
//       ],
//       "headerkey1": [
//           "headervalue1"
//       ],
//       "Host": [
//           "randomurl.execute-api.us-east-1.amazonaws.com"
//       ],
//       "Postman-Token": [
//           "askjas-37b8-4f99-9e41-random"
//       ],
//       "User-Agent": [
//           "PostmanRuntime/7.16.3"
//       ],
//       "Via": [
//           "1.1 random.cloudfront.net (CloudFront)"
//       ],
//       "X-Amz-Cf-Id": [
//           "random-random-g=="
//       ],
//       "X-Amzn-Trace-Id": [
//           "Root=1-5d80ba5a-random"
//       ],
//       "X-Forwarded-For": [
//           "10.10.10.10, 10.10.10.10"
//       ],
//       "X-Forwarded-Port": [
//           "443"
//       ],
//       "X-Forwarded-Proto": [
//           "https"
//       ]
//   },
//   "queryStringParameters": {
//       "max": "100",
//       "min": "50"
//   },
//   "multiValueQueryStringParameters": {
//       "max": [
//           "100"
//       ],
//       "min": [
//           "50"
//       ]
//   },
//   "pathParameters": null,
//   "stageVariables": null,
//   "requestContext": { resourceId: "rdae",
//       "resourcePath": "/randomnumber",
//       "httpMethod": "GET",
//       "extendedRequestId": "AKI=",
//       "requestTime": "17/Sep/2019:10:50:02 +0000",
//       "path": "/dev/randomnumber",
//       "accountId": "accid",
//       "protocol": "HTTP/1.1",
//       "stage": "dev",
//       "domainPrefix": "randomurl",
//       "requestTimeEpoch": 15687174102817,
//       "requestId": "755413159-bc4b-4f87-aee2-659ce7888a07",
//       "identity": { cognitoIdentityPoolId: null,
//           "accountId": null,
//           "cognitoIdentityId": null,
//           "caller": null,
//           "sourceIp": "10.10.10.10",
//           "principalOrgId": null,
//           "accessKey": null,
//           "cognitoAuthenticationType": null,
//           "cognitoAuthenticationProvider": null,
//           "userArn": null,
//           "userAgent": "PostmanRuntime/7.16.3",
//           "user": null
//       },
//       "domainName": "randomurl.execute-api.us-east-1.amazonaws.com",
//       "apiId": "randomurl"
//   },
//   "body": null,
//   "isBase64Encoded": false
// }