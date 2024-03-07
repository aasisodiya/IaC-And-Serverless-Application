provider "aws" {
  region = "${var.region}"
}
# passing variable inline : terraform apply -var amitype='ami-0d8f6eb4f641ef691'
resource "aws_instance" "aws_insatnce_name" {
  ami = "${lookup(var.ami_id, var.region)}"
  instance_type = "${lookup(var.instance_type, var.env)}"
#   security_groups = "${var.sgs}"
}

variable "env" {
  default = "dev"
}

variable "region" {
}


#List Variable
# variable "sgs" {
#   type = "list"
#   default = ["sg1","sg2"]
# }

#Map Variable
variable "instance_type" {
  description = "description"
  type = "map" #what happens if i don't specify this?
  default = {
      dev = "t2.micro"
      test = "t2.micro"
  }
}

variable "ami_id" {
  default = {
      us-east-1 = "ami-east-1"
      us-east-2 = "ami-east-2"
  }
}
