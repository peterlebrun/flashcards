# Basic Ubuntu image for quick spin-up/teardown
data "aws_ami" "test" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-trusty-14.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "server" {
  ami                    = "${data.aws_ami.test.id}"
  instance_type          = "t2.micro"
  vpc_security_group_ids = [
    "${aws_security_group.lb_target.id}",
    "${aws_security_group.ssh_and_ping.id}",
    "${aws_security_group.instance.id}"
  ]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p "${var.server_port}" &
              EOF

  key_name = "${var.key_pair}"
  subnet_id = "${aws_subnet.pub-1a.id}"

  tags = {
    Name = "test-api-server"
  }
}

resource "aws_alb_target_group_attachment" "deeznutz" {
  target_group_arn = "${aws_alb_target_group.deeznutz.arn}"
  target_id        = "${aws_instance.server.id}"
  port             = 8080
}
