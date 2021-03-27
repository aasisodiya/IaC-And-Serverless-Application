# Serverless Scripts

```text
 _______                             __
|   _   .-----.----.--.--.-----.----|  .-----.-----.-----.
|   |___|  -__|   _|  |  |  -__|   _|  |  -__|__ --|__ --|
|____   |_____|__|  \___/|_____|__| |__|_____|_____|_____|
|   |   |             The Serverless Application Framework
|       |                           serverless.com, v1.66.0
 -------'
```

## What is Serverless

The Serverless Framework helps you build serverless apps. For now (as of 1st March 2020) it supports following platform

- AWS*
- Google Cloud
- Azure
- OpenWhisk
- Kubeless

& following Languages

- nodeJS*
- Python*
- Go*
- Swift
- Java
- PHP
- Ruby

*\*I have worked on*

## Getting Started with the Serverless Framework and AWS

> **Prerequisites:** Node version 6 or higher

I prefer installing via npm

```powershell
# Install the serverless cli
npm install -g serverless

# Or, update the serverless cli from a previous version
npm update -g serverless
# Or
npm i -g serverless
```

Now to start with Serverless in Nodejs

```powershell
# Create and deploy a new service/project
serverless

Serverless: No project detected. Do you want to create a new one? Yes
Serverless: What do you want to make? (Use arrow keys)
> AWS Node.js
  AWS Python
  Other

# I have selected Node.js
Serverless: What do you want to call this project? serverless-in-nodejs

Project successfully created in 'serverless-in-nodejs' folder.

You can monitor, troubleshoot, and test your new service with a free Serverless account.

Serverless: Would you like to enable this? (Y/n)  Yes

Serverless: What do you want to name this application? serverless-in-nodejs

Your project is setup for monitoring, troubleshooting and testing

Deploy your project and monitor, troubleshoot and test it:
- Run "serverless deploy" to deploy your service.
- Run "serverless dashboard" to view the dashboard.
```

Now lets deploy it

```powershell
# Switch to newly created directory
cd serverless-in-nodejs
# Deploy to AWS
serverless deploy
# Delete Deployment
serverless remove
```

Just for personal reference, **Please make sure correct profile is active**

```powershell
# To show your current configuration values:
aws configure list

# To show configuration values for a specific profile:
aws configure list --profile profile-name
```

## Command Descriptions

- `serverless` Helps create some app template on serverless website

- `serverless create -t aws-nodejs` Create a new Serverless Service with template for aws-nodejs (Creates handler.js and serverless.yml file)

- `serverless config credentials --provider aws --key AKIASAKASHSINGH --secret ITSD@NGER0U$T0$#@RE` Used to set AWS credentials for serverless

- `serverless deploy` Will deploy your template to your platform

- `serverless deploy --stage stage-name` Used for stage specific deployments

- `servelress remove` It will remove the deployment **(Only removes dev stage)**

- `servelress remove --stage stage-name` It will remove the deployment for stage stage-name

- `servelress --help` Provides help

- `serverless invoke --function function_name` Command to invoke the function function_name

- `serverless invoke -f function_name` Command to invoke the function function_name

- `serverless invoke local --function function_name` Use this command for Local Execution

- `serverless logs -f function_name -t` Command to load logs for function function_name & Optionally tail the logs with -t

**Short CMD:** sls (Instead of Serverless)

> *Note: sls will conflict with sls alias command of powershell so in order to remove the conflict delete that alias : "Remove-Item alias:sls" but this will only disable the powershell alias for current/running session. For permanent change you will have to edit Microsoft.PowerShell_profile.ps1*

## Serverless 5 Main Concepts

1. Functions
2. Events (Triggers Functions, Infrastructure Provisioned Automatically)
3. Resources (Define AWS Resources)
4. Services (Contains config for all functions, events and resources)
5. Plugins (Extend the framework functionality)

### Serverless Files

1. serverless.yaml (Template)
2. handler.js (Function Body)

### Function Execution

1. Cloud Execution
Use: `serverless invoke --function function_name`
2. Local Execution
Use: `serverless invoke local --function function_name`
You cannot execute your functions locally always, ex. For SES and S3 you might fail and have to provide mock objects

### Events

Lambda Functions are triggered by events (Ex. APIGW Events, S3 Events, SQS, etc)

### Environment Variables

- Can be defined in provider section using environment
- Can be defined in config part of function
- Can be accessed using process.env.variableName

### Serverless Monitoring

- Unless you enable Monitoring using "serverless" command, you won't get any warnings inside terminal while deployment

## Error Debugging (My Observations)

- **Error**: Command failed: `npm install`

  Solution: Probably some wrong indentations given somewhere inside the code

- **Error**: Code doesn't execute even when everything is fine

  Solution: Its my observation that whenever I enable serverless to monitor my project it starts showing problems, so try without enabling serverless

## Some Other Points

 1. Create Package.json : npm init -y
 2. Install AWS SDK and other libraries : npm install --save aws-sdk moment underscore uuid
 3. Example To Fetch Variable inside Lambda Code Ex. `const tableName = process.env.tableName`

## Managing AWS Credentials

You can set up different profiles for different accounts, which can be used by Serverless as well. To specify a default profile to use, you can add a profile setting to your provider configuration in serverless.yml:

```yml
service: new-service
provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  profile: devProfile
```

### Use an existing AWS Profile

To easily switch between projects without the need to do aws configure every time you can use environment variables. For example you define different profiles in ~/.aws/credentials

```credentials
[profileName1]
aws_access_key_id=***************
aws_secret_access_key=***************

[profileName2]
aws_access_key_id=***************
aws_secret_access_key=***************
```

Now you can switch per project (/ API) by executing once when you start your project:

> `export AWS_PROFILE="profileName2" && export AWS_REGION=eu-west-1.`

in the Terminal. Now everything is set to execute all the serverless CLI options like sls deploy. The AWS region setting is to prevent issues with specific services, so adapt if you need another default region.

### Using the aws-profile option

You can always specify the profile which should be used via the aws-profile option like this:

`serverless deploy --aws-profile devProfile`

### Per Stage Profiles

As an advanced use-case, you can deploy different stages to different accounts by using different profiles per stage. In order to use different profiles per stage, you must leverage variables and the provider profile setting.

This example serverless.yml snippet will load the profile depending upon the stage specified in the command line options (or default to 'dev' if unspecified);

```yml
service: new-service
provider:
  name: aws
  runtime: nodejs12.x
  stage: ${opt:stage, self:custom.defaultStage}
  profile: ${self:custom.profiles.${self:provider.stage}}
custom:
  defaultStage: dev
  profiles:
    dev: devProfile
    prod: prodProfile
```

## Reference

- [Serverless Documentation](https://serverless.com/framework/docs/)
- [LearnCode.academy](https://www.youtube.com/watch?v=71cd5XerKss)
- [SimplyExplained - Savjee](https://www.youtube.com/watch?v=lUTGk64jppM&list=PLzvRQMJ9HDiT5b4OsmIBiMbsPjfp4kfg3)
- [Serverless AWS - Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
