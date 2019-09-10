data "aws_availability_zones" "available" {}

resource "aws_vpc" "main-vpc" {
  cidr_block = "10.0.0.0/16"

  tags {
    Name = "main-vpc"
  }
}

resource "aws_internet_gateway" "pub-igw" {
  vpc_id   = "${aws_vpc.main-vpc.id}"

  tags {
    Name            = "pub-igw"
    business-unit   = "deeznutz"
    managed-by      = "terraform"
    safe-to-destroy = "false"
  }
}

resource "aws_route_table" "pub-dmz" {
  vpc_id   = "${aws_vpc.main-vpc.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.pub-igw.id}"
  }

  tags {
    Name            = "pub-dmz"
    business-unit   = "deeznutz"
    managed-by      = "terraform"
    safe-to-destroy = "false"
  }
}

resource "aws_subnet" "pub-1a" {
  vpc_id                  = "${aws_vpc.main-vpc.id}"
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${data.aws_availability_zones.available.names[0]}"
  map_public_ip_on_launch = true

  tags {
    Name            = "pub-1a"
    business-unit   = "deeznutz"
    managed-by      = "terraform"
    safe-to-destroy = "false"
  }
}

resource "aws_subnet" "pub-1b" {
  vpc_id                  = "${aws_vpc.main-vpc.id}"
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${data.aws_availability_zones.available.names[1]}"
  map_public_ip_on_launch = true

  tags {
    Name            = "pub-1b"
    business-unit   = "deeznutz"
    managed-by      = "terraform"
    safe-to-destroy = "false"
  }
}
