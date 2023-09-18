# Readme

This repro contains a minimal working example of an issue we're running into with the Netlify CLI being unable to
use self-signed certificates.
This is a fork of https://github.com/netlify-templates/nextjs-toolbox with two new commits.

The first commit adds an example edge function which fetches a response from another page on the same domain.
When run in standard HTTP configuration this request succeeds and the page works.

The second commit adds example SSL configuration that can be used to run the dev server in HTTPS mode,
and provides commands for enabling this configuration. When run in this mode, the fetch command now fails.

### SSL Configuration Instructions
1. Run `./openssl_command.sh` to generate the keypair
2. Run `./trust_cert_command.sh` to add it to your keychain
3. After you're done testing, remove the generated certificate from your keychain

### Reproducing the error
1. Checkout to the first commit (`git checkout 7e0a081def79f882dc10fff41bb484afd9119ade`) and run the server with `npm run netlify-dev`
2. The default homepage should launch and load properly
3. Navigate to `http://localhost:8888/edge` and observe that a "hello world" is produced. In the console, it should log `200` as the status code it received
4. Checkout back to the original commit (`git checkout main`)
5. Follow the SSL instructions above if you haven't already
6. Relaunch the server with `npm run netlify-dev`
7. Observe that the default homepage loads properly, this time under https://localhost
8. Navigate to https://localhost/edge and observe that the server crashes with the following error
```
[example-edge-function] TypeError: error sending request for url (https://localhost/): error trying to connect: invalid peer certificate: UnknownIssuer
```