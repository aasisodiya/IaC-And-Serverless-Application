# IOT Triggered Lambda

## Instructions

Considering the serverless scripts, for triggering a lambda from IOT event all you have to do is add following code to your script

```yml
    events:
      - iot:
          name: "IOTRule"
          sql: "SELECT * FROM 'testtopic/#' where status = 'false'"
          description: "This rule will select all published topic with status flag as false."
```

What the above script does is, It will trigger your lambda if any message published to IOT with topic as `testtopic/`. Now event that your lambda receives is what you send as message

## Manual Approach Instructions

In Trigger configuration, select AWS IOT (aws devices iot) as trigger. Then in IoT type select Custom IoT rule. Now configure a Rule by selecting Create a new rule option. Give your Rule name and Rule description. Now the important part for **Rule query statement** Create a SQL statement for this rule. For example `select * from "customtopic/#"`. Then select Enable Trigger to Enable the trigger now, or create it in a disabled state for testing (recommended). Best part of using this Add Trigger in Lambda approach is that Lambda will add the necessary permissions for AWS IoT to invoke your Lambda function from this trigger.

## Reference

* [AWS IoT Rule](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-reference.html)
