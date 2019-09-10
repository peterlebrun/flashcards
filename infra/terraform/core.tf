provider "aws" {
  region  = "us-east-1"
}

terraform {
  required_version = "~> 0.11.14"

  backend "s3" {
    bucket  = "dz-tf-state"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}
