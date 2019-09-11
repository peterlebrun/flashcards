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
  ]

  user_data = <<-EOF
              #!/bin/bash
              curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
              curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
              echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
              sudo apt-get -y update
              sudo apt-get -y install git nodejs yarn
              mkdir /home/ubuntu/app
              cd /home/ubuntu/app
              git clone https://github.com/peterlebrun/flashcards.git
              cd flashcards/app
              yarn install
              nohup node server.js &
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
  port             = 8888
}
