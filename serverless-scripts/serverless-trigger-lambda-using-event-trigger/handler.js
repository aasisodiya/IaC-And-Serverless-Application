// Author: Akash Sisodiya
'use strict';
module.exports.hello = async event => {
  console.log('Lambda Triggered by some event!');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Lambda Triggered by some event!',
        input: event,
      },
      null,
      2
    ),
  };
};
