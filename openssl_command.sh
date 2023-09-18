openssl req \
  -config "./example_openssl.conf" -new -sha256 -newkey rsa:2048 \
  -nodes -keyout "example_cert.key" -x509 -days 365 \
  -out "example_cert.crt" -batch