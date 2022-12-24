const SibApiV3Sdk = require('sib-api-v3-sdk')
const keys = require('../keys');

module.exports = function (msg) {
  SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = keys.sendBlueAPI;
  new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
    msg
  ).then(function(data) {
    console.log(data);
  }, function(error) {
    console.error(error);
  }); 
}

