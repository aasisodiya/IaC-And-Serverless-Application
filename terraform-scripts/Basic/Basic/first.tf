provider "aws" {
  access_key = "AKIASFUDXDJDB4R6CJK3"
  secret_key = "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"
  region     = "us-east-2"
}

# SIbhK8o+xMBlUuKLQ/Fm5Or/nEgJmzm3QDA6DYNa
# AKIASFUDXDJDB4R6CJK3
# resource "aws_instance" "akash_instance" {
#   ami           = "ami-0d8f6eb4f641ef691"
#   instance_type = "t2.micro"
# }

resource "aws_s3_bucket" "s3bucketakash" {
    bucket = "s3bucketakashtest"
    versioning {
        enabled = true
    }
    lifecycle {
        prevent_destroy = true
    }
    tags = {
        Name = "S3 Remote Store"
    }
}
