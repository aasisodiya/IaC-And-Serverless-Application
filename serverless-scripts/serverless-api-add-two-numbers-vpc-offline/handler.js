// Author: Akash Sisodiya
'use strict';
module.exports.add = async event => {
  let { num1, num2 } = JSON.parse(event.body);
  console.log('Test Addition Function!');
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Addition of two number is: ' + (num1 + num2),
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.addnew = async event => {
  let { num1, num2 } = event;
  return num1 + num2;
};
