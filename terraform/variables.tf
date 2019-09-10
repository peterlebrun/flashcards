variable "tls_cert" {
  description = "TLS Cert ARN"
  type        = "string"
}

variable "key_pair" {
  description = "Name of key pair for EC2 instances"
  type        = "string"
}

variable "server_port" {
  description = "The port the server will use for HTTP requests"
  type        = "string"
  default     = "8080"
}
