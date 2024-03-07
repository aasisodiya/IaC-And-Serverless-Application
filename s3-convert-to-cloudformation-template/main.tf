provider "aws" {
    region = "${var.region}"
    profile = "${var.profile}"
}
resource "aws_s3_bucket" "state-bucket" {
    bucket = "${var.stateBucket}"
    acl    = "private"
    versioning {
        enabled = true
    }
    lifecycle {
        prevent_destroy = true
  }
}
resource "aws_s3_bucket_public_access_block" "block-unblock-public-access" {
    bucket = "${aws_s3_bucket.state-bucket.id}"
    block_public_acls   = true
    block_public_policy = true
    ignore_public_acls = true
    restrict_public_buckets = true
}