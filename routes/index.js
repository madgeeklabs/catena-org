var express = require('express');
var router = express.Router();

var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "r9tpr7tdrnqxtfjn",
  publicKey: "wjh8jm6dxnp2254m",
  privateKey: "5cdb18e2e2cd4db2727989c269523027"
});

/* GET Creates a new token and returns it in the response */
router.get('/token', function (req, res) {
  gateway.clientToken.generate(null, function (error, response) {
    if (!error) {
      res.send(response.clientToken);
    } else {
      res.send(response);
    }
  });
});

/* POST Handles the amount & payment method nonce to execute a transaction */
router.post('/payment', function (req, res) {
  var amount = req.param('amount');
  var payment_method_nonce = req.param('payment_method_nonce');

  var sale = {
    amount: amount,
    payment_method_nonce: payment_method_nonce
  };

  gateway.transaction.sale(sale, function (error, response) {
    if (!error && response.success) {
      res.send('Payment done');
    } else {
      res.send(response);
    }
  });
});

module.exports = router;
