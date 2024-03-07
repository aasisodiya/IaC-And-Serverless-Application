provider "aws" {
  region = "us-east-2"
#   we are using IAM Roles here for access instead of credentials
}

# #Without using variables
# resource "aws_instance" "aws_instance_resource_name" {
#   ami = "ami-0d8f6eb4f641ef691"
#   instance_type = "t2.micro"
#   count = 3
#   tags = {
#       Name = "aws_instance_tag_name-${count.index}"
#   }
# }

# using variables, variable interpolation
variable "amitype" {
  description = "AMI Type"
  default = "ami-0d8f6eb4f641ef691"
}

# passing variable inline : terraform apply -var amitype='ami-0d8f6eb4f641ef691'

resource "aws_instance" "aws_instance_resource_name" {
  ami = "${var.amitype}"
  instance_type = "t2.micro"
  count = 3
  tags = {
      Name = "aws_instance_tag_name-${count.index}"
  }
}

