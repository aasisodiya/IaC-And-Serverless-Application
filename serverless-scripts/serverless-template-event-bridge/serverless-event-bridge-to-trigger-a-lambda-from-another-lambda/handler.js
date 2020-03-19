'use strict';

// Reference : https://www.youtube.com/watch?v=VYtBXdf53b4
const AWS = require('aws-sdk');
const eventbridge = new AWS.EventBridge({ apiVersion: '2015-10-07' });

module.exports.alice = async event => {

  const data = await putEvent();
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Alice was called!'
      },
      null,
      2
    ),
  };
};

module.exports.bob = async event => {
  console.log(event);
  return;
}

function putEvent(params) {
  const detail = { name: 'Message' };
  var params = {
    Entries: [
      {
        Detail: JSON.stringify(detail),
        DetailType: 'Triggering bob',
        Source: 'bob.wakeUp',
      },
    ]
  };

  return eventbridge.putEvents(params).promise()
}