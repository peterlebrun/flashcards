resource "aws_route53_zone" "main" {
  name = "dee-znutz.com"
}

resource "aws_route53_record" "deeznutz-alb" {
  zone_id         = "${aws_route53_zone.main.id}"
  name            = "www.dee-znutz.com"
  type            = "CNAME"
  ttl             = "60"
  records         = ["${aws_alb.deeznutz.dns_name}"]
  allow_overwrite = "false"
}
