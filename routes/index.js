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

/* POST Handles the amount & payment method nonce to execute a transaction */
router.get('/challenge', function (req, res) {
    res.send("challenge?");
});

var devices = [
    {   
        name: "Electric Kettle",
        sendEmail: false,
        sendSMS: true,
        url: "https://192.168.0.111",
        email: "gustavogiudici@gmail.com",
        image: "http://www.sminami.org/main/wp-content/uploads/2009/05/cloer.jpg",
        phone: "+34652022076",
        price: 5,
        id: 1
    },
    {   
        name: "3d printer",
        sendEmail: false,
        sendSMS: true,
        url: "https://192.168.0.111",
        email: "gustavogiudici@gmail.com",
        image: "http://3dp.se/wp-content/uploads/2013/02/reprap_industriell.jpg",
        phone: "+34652022076",
        price: 0,
        id: 2
    },
    {   
        name: "Plug",
        sendEmail: true,
        sendSMS: true,
        url: "https://192.168.0.111",
        email: "gustavogiudici@gmail.com",
        image: "http://www.1001experiencias.com/wp-content/uploads/2013/03/oculus-rift-1.jpg",
        phone: "+34652022076",
        price: 500,
        id: 3
    },

]

router.get('/devices', function (req, res) {
    res.json(devices);

});

router.get('/devices/:id', function(req, res) {
    var i;
    for(i = 0; i < devices.length; i++){
        if (devices[i].id == req.params.id){
            res.json(devices[i]);
        }
    }
});

router.post('/devices/:id', function (req, res) {
    for(var i = devices.length - 1; i >= 0; i--) {
        if(devices[i].id == req.params.id) {
           devices.splice(i, 1);
        }
    }
    devices.push(req.body);
    res.json(req.body);

});


module.exports = router;
