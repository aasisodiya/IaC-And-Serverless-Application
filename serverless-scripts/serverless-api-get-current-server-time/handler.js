// Author : Akash Sisodiya
'use strict';
module.exports.serverTime = async event => {
  let time = new Date();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Current Server Time : ' + time.toLocaleString(),
      },
      null,
      2
    ),
  };
};
