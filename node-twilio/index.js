const accountSid = "accountId";
const authToken = "authToken";
const client = require('twilio')(accountSid, authToken);

/*
client.verify.v2.services('serviceId')
                .entities('ff483d1ff591898a9942916050d2ca3f')
                .newFactors
                .create({
                   friendlyName: `otp-service`,
                   factorType: 'totp'
                 })
                .then(new_factor => console.log(new_factor));
*/

/*
client.verify.v2.services('serviceId')
                .entities('ff483d1ff591898a9942916050d2ca3f')
                .factors('[myFactor]')
                .update({authPayload: '827579'})
                .then(factor => console.log(factor));*/
        
/*
client.verify.v2.services('serviceId')
.entities('ff483d1ff591898a9942916050d2ca3f')
.challenges
.create({
    authPayload: '005267',
    factorSid: '[myFactor]'
    })
.then(challenge => console.log(challenge.status));*/