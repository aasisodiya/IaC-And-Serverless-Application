variable "region" {
  value = "us-east-2"
}

variable "ami_id" {
  value = "ami-0d8f6eb4f641ef691"
}

variable "instance_type" {
  value = "t2.micro"
}

provider "aws" {
  region = "${var.region}"
}

resource "aws_instance" "aws_instance_resource_name" {
  ami = "${var.ami_id}"
  instance_type = "${var.instance_type}"
}

output "public_ip" {
  value = "${aws_instance.aws_instance_resource_name.public_ip}"
}

# > terraform output public_ip > this command will output the value