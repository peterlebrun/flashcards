## External loadbalancer
resource "aws_alb" "deeznutz" {
  name         = "deeznutz"
  subnets      = [
    "${aws_subnet.pub-1a.id}",
    "${aws_subnet.pub-1b.id}",
  ]
  internal     = false
  idle_timeout = 60

  security_groups = [
    "${aws_security_group.lb_external.id}",
  ]

  tags {
    Name          = "dee-znutz-com-lb"
    business-unit = "dee-znutz"
    managed-by    = "terraform"
  }
}

resource "aws_alb_listener" "deeznutz" {
  load_balancer_arn = "${aws_alb.deeznutz.arn}"
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = "${var.tls_cert}"

  default_action {
    target_group_arn = "${aws_alb_target_group.deeznutz.arn}"
    type             = "forward"
  }
}

resource "aws_alb_listener_rule" "deeznutz" {
  depends_on   = ["aws_alb_target_group.deeznutz"]
  listener_arn = "${aws_alb_listener.deeznutz.arn}"
  priority     = 1

  action {
    type             = "forward"
    target_group_arn = "${aws_alb_target_group.deeznutz.arn}"
  }

  condition {
    field  = "path-pattern"
    values = ["/"]
  }
}

resource "aws_alb_target_group" "deeznutz" {
  vpc_id   = "${aws_vpc.main-vpc.id}"
  port     = 8080
  protocol = "HTTP"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 10
    path                = "/"
    matcher             = "200"
  }

  tags {
    Name          = "dee-znutz-com-alb-target-group"
    business-unit = "dee-znutz"
    managed-by    = "terraform"
  }
}
