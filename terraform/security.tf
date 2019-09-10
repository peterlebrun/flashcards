resource "aws_security_group" "lb_external" {
  name        = "lb-external"
  description = "Allow services external https traffic"
  vpc_id      = "${aws_vpc.main-vpc.id}"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name          = "pl-ops-lb-external"
    managed-by    = "terraform"
  }
}

resource "aws_security_group" "lb_target" {
  name        = "lb_target"
  description = "Allow lb to access EC2 instance"
  vpc_id      = "${aws_vpc.main-vpc.id}"

  ingress {
    from_port = 8080
    to_port   = 8080
    protocol  = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port   = 0
    protocol  = "tcp"

    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name          = "pl-ops-lb-target"
    business-unit = "platform"
    managed-by    = "terraform"
  }
}

resource "aws_security_group" "instance" {
  name        = "test_http_access"
  description = "Temporary SG for testing access"
  vpc_id      = "${aws_vpc.main-vpc.id}"

  ingress {
    from_port   = "${var.server_port}"
    to_port     = "${var.server_port}"
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ssh_and_ping" {
  name        = "ssh_and_ping"
  description = "Allow service lb to access services"
  vpc_id      = "${aws_vpc.main-vpc.id}"

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "allow any outbound"
  }

  tags {
    Name          = "pl-ops-ssh-and-ping"
    managed-by    = "terraform"
  }
}
