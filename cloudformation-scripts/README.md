# Cloudformation

## Benefits of AWS CloudFormation

- Infrastructure as Code
- Cost (Estimates)
- Productivity

## CloudFormation Vs Others

- AWS Native, always contains latest fatures
- State Based (Ansible and Terraform - Instrucation Based)
- Ansible and Terraform needs to be updated everytime a new service/api options comes from AWS

## Updates in CloudFormation

1. Updates with no interruption
2. Replacements Updates

## Key Points

- You can't edit CloudFormation template, you will have to upload it again
- Stack Name can't be changed and should be unique to region
- Parameter `NOEcho` is set to `true` for secret value parameter
- Resource Type Indentifiers `AWS::aws-product-name::data-type-name`
- Typed Parameter `AWS::EC2::KeyPair::KeyName` helps us to populate value from AWS side
- To refer a parameter we use : `Fn::Ref ParameterName` or `!Ref ParameterName`
- For CommaSeparatedList we use : `!Select [0, !Ref ParameterName]` where 0 is index
- Dynamic Amount of Resource can not be created. Everything has to be declared explicitly
- Almost every AWS service is supported, if not? work around : AWS lambda custom Resources

## Optional Attributes For Resources

1. DependsOn
2. DeletionPolicy
3. CreationPolicy
4. Metadata

## Mappings

- Fixed variables within your CF template
- All values are hardcoded

```yaml
Mappings:
    RegionMap:
        us-east-1:
            "32":"ami-111"
            "64":"ami-222"
        us-west-1:
            "32":"ami-333"
            "64":"ami-444"
        eu-east-1:
            "32":"ami-555"
            "64":"ami-666"
```

## Mappings Vs Parameter

- Mapping is great if you know all values that can be taken or deduced from variables such as region, az, aws account, env, etc.
- Use Parameters when values are user specific

## How to Access Mapping values

Use `Fn::FindInMap:` OR `!FindInMap [ MapName, TopLevelKey, SecondLevelKey ]`

```yaml
!FindInMap [ RegionMap, !Ref "AWS::Region", 32]
Fn::FindInMap: [ RegionMap, !Ref "AWS::Region", 32]
```

## Pseudo Parameters

- Can be used anytime, anywhere Ex. `AWS::AccountId`, `AWS::Region`, `AWS::StackId`

## Outputs

- Optional
- Something that you can view it in AWS Console or AWS CLI
- Used when you are required to communicate some data (possibly between templtes i.e Cross Stack Reference)

## Cross Stack Reference

- `Fn::ImportValue: OPExportName` OR `!ImportValue OPExportName`
- Can't delete a stack until all its references are deleted as well
- You need to EXPORT the output value before being able to use it in another stack

## Conditions

- Used to control creation of resources/outputs based on Conditions
- Conditions can refer to another condition, parameter value or mapping
- Condition cannot be applied to parameter
- Use `Fn::And`, `Fn::Equals`, `Fn::If`, `Fn::Not`, `Fn::Or`, `!Equals`, `!And`, `!Or`, `!If`, `!Not`

  - ```yaml
    `!Equals [ !Ref KeyNameValueToCompare, ComparedValue ]`
    ```

  - ```yaml
    SecurityGroups:
    - !If [CreateNewSecurityGroup, !Ref NewSecurityGroup, !Ref ExistingSecurityGroup]
    ```

  - ```yaml
    MyAndCondition: !And
    - !Equals ["sg-mysggroup", !Ref ASecurityGroup]
    - !Condition SomeOtherCondition
    ```

  - ```yaml
    !If [condition_name, value_if_true, value_if_false]
    ```

  - ```yaml
    Outputs:
      SecurityGroupId: 
          Description: Group ID of the security group used.
          Value: !If [CreateNewSecurityGroup, !Ref NewSecurityGroup, !Ref ExistingSecurityGroup]
    ```

  - ```yaml
    DBSnapshotIdentifier:
      !If [UseDBSnapshot, !Ref DBSnapshotName, !Ref "AWS::NoValue"]
    ```

  - The following snippet provides an auto scaling update policy only if the RollingUpdates condition evaluates to true. If the condition evaluates to false, AWS CloudFormation removes the AutoScalingRollingUpdate update policy.

    ```yaml
    UpdatePolicy:
      AutoScalingRollingUpdate:
        !If 
          - RollingUpdates
          -
            MaxBatchSize: 2
            MinInstancesInService: 2
            PauseTime: PT0M30S
          - !Ref "AWS::NoValue"
    ```

  - ```yaml
    MyNotCondition:
      !Not [!Equals [!Ref EnvironmentType, prod]]
    ```

  - ```yaml
    MyOrCondition:
      !Or [!Equals [sg-mysggroup, !Ref ASecurityGroup], Condition: SomeOtherCondition]
    ```

  - ```yaml
    DBSnapshotIdentifier:
      !If [UseDBSnapshot, !Ref DBSnapshotName, !Ref "AWS::NoValue"]
    ```

### Get Attribute Function

Use `!GetAtt` or `Fn::GetAtt:`

```yaml
!GetAtt EC2Instance.AvailabilityZone
```

## Metadata

`AWS::CloudFormation::Designer` - This helps with visuals of template for placements of resources

`AWS::CloudFormation::Interface` - Defining Grouping and ordering. It is used when users must input template parameters manually. Ex. Group All EC2 related parameters together

```yaml
Metadata: 
  AWS::CloudFormation::Interface: 
    ParameterGroups: 
      - 
        Label: 
          default: "Network Configuration"
        Parameters: 
          - VPCID
          - SubnetId
          - SecurityGroupID
      - 
        Label: 
          default: "Amazon EC2 Configuration"
        Parameters: 
          - InstanceType
          - KeyName
    ParameterLabels: 
      VPCID: 
        default: "Which VPC should this be deployed to?"
```

## CloudFormation Init and EC2 - User Data

```yaml
UserData:
    Fn::Base64: |
        script
# | pipe here helps for multiline string
```

### Limitation to UserData & Workaround

Limitation is that it only fits certain characters so the workaround is to use **CloudFormation Helper script**

AWS CloudFormation provides the following Python helper scripts that you can use to install software and start services on an Amazon EC2 instance that you create as part of your stack:

- cfn-init
- cfn-signal
- cfn-get-metadata
- cfn-hup

Usual Flow : cfn-init then cfn-signal then optionally cfn-hup

![Flow Diagram](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbkFbY2ZuLWluaXRdIC0tPiBCW2Nmbi1zaWduYWxdIC0tPiB8T3B0aW9uYWxseXwgQ1tjZm4taHVwXSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

- `cfn-init`: Used to retrieve and interpret the resource metadata, installing packages, creating files and starting services.
- `cfn-signal`: A simple wrapper to signal an AWS CloudFormation CreationPolicy or WaitCondition, enabling you to synchronize other resources in the stack with the application being ready
- `cfn-get-metadata`: A wrapper script making it easy to retireve either all metadata defined for a resource or path to a specific key or subtree of the resource metadata.
- `cfn-hup`: A daemon to check for updates to metadata and execute custom hooks when the changes are detected.

Config Block

Packages Block

- Can install from : apt, msi, python, rpm, rubygems, and yum
- [] means latest version

## Files

```yaml
files:
    /tmp/temp.txt:
        content: !Sub |
            My stack name
            is ${AWS::StackName}
```

## Substitution Functions

Replace piece of text with its value Ex. In above case ${AWS::StackName} will be replaced with its value

```yaml
!Sub
  - String
  - {Varname: varvalue, Var2Name: var2value}
#OR
!Sub String
```

Command Block

Services Block

## User Data vs CloudFormation::Init vs Helper Scripts

In summary, what's the difference between EC2 User Data, CloudFormation::Init, and CF Helper scripts?

- User-data is an imperative way to provision/bootstrap the EC2 instance using SHELL syntax .
- `AWS::CloudFormation::Init` is a declarative way to provision/bootstrap the EC2 instance using YAML or JSON syntax.
- `AWS::CloudFormation::Init` is useless if it is NOT triggered by UserData.

> Triggering AWS::CloudFormation::Init inside UserData is done by one of helper scripts (cfn-init).

## CloudFormation Drift

- Drift means - if our resources have changed
- Not all resources are supported yet
- Detect Drift option is used to detect drift

## Nested Stacks

- Are uploaded to S3
- Update to stack has to be done manually
- Never delete/apply changes to child stack

```yaml
Resources:
    CloudFormationStack:
        Type: AWS::CloudFormation::Stack
        Properties:
            TemplateURL: template-TemplateURL
            Parameters:
                ApplicationName: !Ref AWS::StackName
                VPCId: !Ref VPCId
            TimeoutInMinutes: 60
```

## Exporting Stack Output Values Vs. Using Nested Stacks

- If you have a central resource that is shared between many different other stacks, use Exported Stack Output Values
- If you need other stacks to be updated right away if a central resource is updated, use Exported Stack Output Values
- If the resources can be dedicated to one stack only and must be re-usable pieces of code,Nested Stacks
- Note that you will need to update each Root stack manually in case of Nested Stack updates

## Deletion Policy

- Not to delete some resources while deleting stack
- Value : Delete, Retain, Snapshot

```yaml
    DeletionPolicy: Retain
```

## Useful Tools

|Tools|Details|
|-|-|
|Troposphere|Leverage Python to write CF templates|
|Former2.com|Create CF Template |

## Troubleshooting

- **Issue:** Unable to delete RDS Instance created using cloudfront (The option group cannot be deleted because it is in use.)

  **Solution:** Delete all dependency of option group first, which in this case was the snapshots, but sometimes it still doesn't work then you will have to wait for a while before deleteing. Reefrence to AWS feedback : RDS service might take some "system snapshot" that aren't visible to the customer. It seems that these internal RDS snapshots were preventing deletion of the option group as it might take some time to release the association from the option groups after deleting the RDS instance and all the snapshots (at least for those visible to the user).

- **Issue:** Unable to delete Option Group

  **Solution:** The option group is deleted successfully only after manually deleting the manual snapshots which have a reference to option group. So it'a a dependency.

## Reference

- [How to restore AWS RDS SQL Server database from S3 bucket using SSMS](https://medium.com/developer-diary/how-to-restore-sql-server-database-from-aws-s3-bucket-using-ssms-1201d31ab93e)
- [Youtube - AWS RDS SQL Server Database Restore using S3](https://www.youtube.com/watch?v=aj76RPamXeE)