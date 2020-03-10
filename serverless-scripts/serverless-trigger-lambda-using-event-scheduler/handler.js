// Author: Akash Sisodiya
'use strict';
module.exports.hello = async event => {
  console.log("Event Hello has been triggered by a scheduled call!");
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
