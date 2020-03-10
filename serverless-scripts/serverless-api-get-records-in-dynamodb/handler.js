'use strict';
// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the Region 
AWS.config.update({ region: 'us-east-1' });
// Create the DynamoDB service object
var ddb = new AWS.DynamoDB.DocumentClient();

module.exports.getData = async event => {
  console.log("test3")
  let testid = decodeURIComponent(event.pathParameters.testid)
  var params = {
    TableName: 'testtable',
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": 1,
    }
  };
  let datadb = await ddb.query(params).promise();
  console.log(datadb);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: datadb,
      },
      null,
      2
    ),
  };
};
