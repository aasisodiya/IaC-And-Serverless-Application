# Terraform

![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.iac.terraform&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)

_Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently._

## The key features of Terraform

### Infrastructure as Code

Infrastructure is described using a high-level configuration syntax. This allows a blueprint of your data-center to be versioned and treated as you would any other code. Additionally, infrastructure can be shared and re-used.

### Execution Plans

Terraform has a "planning" step where it generates an execution plan. The execution plan shows what Terraform will do when you call apply. This lets you avoid any surprises when Terraform manipulates infrastructure.

### Resource Graph

Terraform builds a graph of all your resources and parallelizes the creation and modification of any non-dependent resources. Because of this, Terraform builds infrastructure as efficiently as possible, and operators get insight into dependencies in their infrastructure.

### Change Automation

Complex change-sets can be applied to your infrastructure with minimal human interaction. With the previously mentioned execution plan and resource graph, you know exactly what Terraform will change and in what order, avoiding many possible human errors.

Below command gives you version of Terraform installed

```powershell
terraform --version
```

The set of files used to describe infrastructure in Terraform is simply known as a **_Terraform configuration_**.

Sample Configuration to launch a single AWS EC2 instance:

```terraform
provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

resource "aws_instance" "example" {
  ami           ="ami-2757f631"
  instance_type = "t2.micro"
}
```

> If you use a region other than us-east-1 then you will need to choose an AMI in that region as AMI IDs are region specific.

---

**The provider block** is used to configure the named provider, in our case "aws". A provider is responsible for creating and managing resources. Multiple provider blocks can exist if a Terraform configuration is composed of multiple providers, which is a common situation.

**The resource block** defines a resource that exists within the infrastructure. A resource might be a physical component such as an EC2 instance, or it can be a logical resource such as a Heroku application.

**The resource block** has two strings before opening the block: **the resource type** and **the resource name**. In our example, the resource type is "aws_instance" and the name is "example." The prefix of the type maps to the provider. In our case "aws_instance" automatically tells Terraform that it is managed by the "aws" provider.

---

**The Terraform language supports three different syntaxes for comments:**

1. \# begins a single-line comment, ending at the end of the line.
2. // also begins a single-line comment, as an alternative to #.
3. /\* and \*/ are start and end delimiters for a comment that might span over multiple lines.

The \# single-line comment style is the default comment style and should be used in most cases. Automatic configuration formatting tools may automatically transform // comments into # comments, since the double-slash style is not idiomatic.

---

```powershell
terraform init
```

**terraform init** is the First imp Command which initializes various local settings and data that will be used by subsequent commands. The terraform init command will automatically download and install any Provider binary for the providers in use within the configuration

```powershell
terraform apply
```

**terraform apply** is the Second imp Command. The commands shown in this guide apply to Terraform 0.11 and above. Earlier versions require using the terraform plan command to see the execution plan before applying it. Use terraform version to confirm your running version. Terraform also write some data into the `terraform.tfstate` file. This state file is extremely important; it keeps track of the IDs of created resources so that Terraform knows what it is managing. This file must be saved and distributed to anyone who might run Terraform. It is generally recommended to setup remote state when working with Terraform, to share the state automatically

```powershell
terraform show
```

**terraform show** with this command You can inspect the current state using terraform show

By using Terraform to change infrastructure, you can version control not only your configurations but also your state so you can see how the infrastructure evolved over time.

After every change in configuration you made run: `terraform apply`

- The prefix -/+ means that Terraform will destroy and recreate the resource, rather than updating it in-place. Some attributes can be updated in-place _(which are shown with the ~ prefix)_
- The - prefix indicates that the instance will be destroyed.
- Prefix + indicates that Terraform will create this resource

```powershell
terraform destroy
```

**terraform destroy** is the Third imp Command, Resources can be destroyed using the terraform destroy command, which is like terraform apply but it behaves as if all the resources have been removed from the configuration. Terraform will destroy them in a suitable order to respect dependencies

## Dependencies in Terraform

```terraform
resource "aws_eip" "ip" {
  vpc      = true
  instance = aws_instance.example.id
}
```

This should look familiar from the earlier example of adding an EC2 instance resource, except this time we're building an "aws_eip" resource type. This resource type allocates and associates an elastic IP to an EC2 instance. Terraform created the EC2 instance before creating the Elastic IP address. Due to the interpolation expression that passes the ID of the EC2 instance to the Elastic IP address, Terraform is able to infer a dependency, and knows it must create the instance first.

**Terraform can automatically infer when one resource depends on another.** In the example above, the reference to aws_instance.example.id creates an implicit dependency on the aws_instance named example.

Implicit dependencies via interpolation expressions are the primary way to inform Terraform about these relationships and should be used whenever possible.

_Sometimes there are dependencies between resources that are not visible to Terraform._ The depends_on argument is accepted by any resource and accepts a list of resources to create explicit dependencies for.

For example, perhaps an application we will run on our EC2 instance expects to use a specific Amazon S3 bucket, but that dependency is configured inside the application code and thus not visible to Terraform. In that case, we can use depends_on to explicitly declare the dependency:

```terraform
# New resource for the S3 bucket our application will use.
resource "aws_s3_bucket" "example" {
  # NOTE: S3 bucket names must be unique across _all_ AWS accounts, so
  # this name must be changed before applying this example to avoid naming
  # conflicts.
  bucket = "terraform-getting-started-guide"
  acl    = "private"
}

# Change the aws_instance we declared earlier to now include "depends_on"
resource "aws_instance" "example" {
  ami           = "ami-2757f631"
  instance_type = "t2.micro"
  # Tells Terraform that this EC2 instance must be created only after the
  # S3 bucket has been created.
  depends_on = [aws_s3_bucket.example]
}
```

## Provisioner

If you need to do some initial setup on your instances, then provisioners let you upload files, run shell scripts, or install and trigger other software like configuration management tools, etc.

To define a provisioner, modify the resource block defining the "example" EC2 instance to look like the following:

```terraform
resource "aws_instance" "example" {
  ami ="ami-b374d5a5"
  instance_type ="t2.micro"

  provisioner_"local-exec" {
    command ="echo ${aws_instance.example.public_ip} > ip_address.txt"
  }
}
```

## Defining Variables

**Note:** that the file can be named anything, since Terraform loads all files ending in `.tf` in a directory. You can create a new file for variables namely `variable.tf`

```terraform
variable "region" {
  default ="us-east-1"
}
```

**Using Variables in Configuration** example

```terraform
provider "aws" {
  region = var.region
}
```

This uses more interpolations, this time prefixed with `var.` tells Terraform that you're accessing variables. This configures the AWS provider with the given variables.

## Assigning Variables

There are multiple ways to assign variables. Below is also the order in which variable values are chosen. The following is the descending order of precedence in which variables are considered.

### Command-line flags

You can set variables directly on the command-line with the `-var` flag. Any command in Terraform that inspects the configuration accepts this flag, such as apply, plan, and refresh:

```powershell
$ terraform apply \
-var 'region=us-east-2'
# ...
```

Once again, setting variables this way will not save them, and they'll have to be input repeatedly as commands are executed.

### From a file

To persist variable values, create a file and assign variables within this file. Create a file named `terraform.tfvars` with the following contents:

```terraform
region ="us-east-2"
```

For all files which match `terraform.tfvars` or `*.auto.tfvars` present in the current directory, Terraform automatically loads them to populate variables. If the file is named something else, you can use the **-var-file** flag directly to specify a file. These files are the same syntax as Terraform configuration files. And like Terraform configuration files, these files can also be JSON. You can use multiple `-var-file` arguments in a single command, with some checked in to version control and others not checked in. For example:

```terraform
$ terraform apply \
  -var-file="secret.tfvars" \
  -var-file="production.tfvars"
```

### From environment variables

Terraform will read environment variables in the form of `TF_VAR_name` to find the value for a variable. For example, the `TF_VAR_region` variable can be set to set the region variable.

> **Basics of Terraform :** Youtube Playlist [Terraform Playlist](https://www.youtube.com/playlist?list=PLQP5dDPLts65J8csDjrGiLH5MZgTyTsDB)
> **Difference between Terraform and Cloudformation:** [AWS Cloudformation vs Terraform: Prepare for DevOps/ Cloud Engineer Interview](https://www.youtube.com/watch?v=uFaMUS6Z9fI)

|Command                                  |Description                                |
|-----------------------------------------|-------------------------------------------|
|`terraform init`                         |Safe to run multiple time                  |
|`terraform plan`                         |Gives complete plan to visualize           |
|`terraform apply`                        |Actually deploy the resources              |
|`terraform graph`                        |Helps to visualize                         |
|`apt install graphviz`                   |Install [graphviz](http://www.graphviz.org)|
|`terraform graph | dot -Tpng > graph.png`|Generate Graph Image                       |

## Steps to Start Terraform

### Create an EC2 instance and login and run below commands

1. `wget https://releases.hashicorp.com/terraform/0.12.6/terraform_0.12.6_linux_amd64.zip`
2. `unzip terraform_0.12.6_linux_amd64.zip`

    ```powershell
    apt install unzip
    ```

3. `pwd` - get the path
4. `export PATH=$PATH:/home/ec2-user` - set the path

### Grant Access to your ec2 instance

1. Create user
2. Set Programmatic access
3. Save the secret key and accesskey

### Perform Required Terraform Operations

1. terraform init
2. terraform plan
<!-- 3. create a file with below code -->

> Files must either end in .tf or .tf.json

## Interpolation

1. Variable Interpolation
2. Data source Interpolation
3. Resource Interpolation

![Visitors](https://api.visitorbadge.io/api/visitors?path=aasisodiya.iac&labelColor=%23ffa500&countColor=%23263759&labelStyle=upper)
