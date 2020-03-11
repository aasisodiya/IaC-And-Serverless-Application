// Author: Akash Sisodiya
// npm install --save aws-sdk moment underscore uuid
'use strict';
const moment = require('moment');


module.exports.logger = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Serverless CICD Demo!',
        version: "v1.0",
        timestamp: moment().unix()
      },
      null,
      2 
    ),
  };
};
