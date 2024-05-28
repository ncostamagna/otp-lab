# Introduction
resource: https://www.twilio.com/docs/verify/quickstarts/totp

# Service
First, you need to create a service on Twilio
```
  Twilio Console > Verify > Services
```
and copy the **Service SID**, **Account SID** and **Auth Token**


# Install
is necessary to install the twilio package
```
npm i twilio
```

# Create a new Factor
```js
const accountSid = '[ACCOUNT_SID];
const authToken = '[AUTH_TOKEN]';

const client = require('twilio')(accountSid, authToken);

client.verify.v2.services('[SERVICE_SID]')
                .entities('[RFC-6238]') // https://datatracker.ietf.org/doc/html/rfc6238
                .newFactors
                .create({
                   friendlyName: `otp-service`,
                   factorType: 'totp'
                 })
                .then(new_factor => console.log(new_factor));
```

# Create a QR Code
you will recive the next value: otpauth://totp/Twilio:John%E2%80%99s%20Account%20Name?secret=GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ&issuer=Twilio&algorithm=SHA1&digits=6&period=30

you need to create a QR code with it, and verify the code:

- https://www.qr-code-generator.com/
- https://github.com/soldair/node-qrcode
- https://github.com/skip2/go-qrcode

```js
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .entities('ff483d1ff591898a9942916050d2ca3f')
                .factors('YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .update({authPayload: '293412'})
                .then(factor => console.log(factor.status));
```

is neccesary to do this first verification to use the authenticator with this user

# Validate a token
after all that, we can validate owr token:

```js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .entities('ff483d1ff591898a9942916050d2ca3f')
                .challenges
                .create({
                   authPayload: '123456',
                   factorSid: 'YFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                 })
                .then(challenge => console.log(challenge.status));
```

we'll recive approved (if the token is ok) or pending (if not) 
