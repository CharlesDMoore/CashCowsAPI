var express = require('express');
var router = express.Router();

// CHANGE THE NAMES SO THEY'RE

/* GET userlist. */
router.get('/bondslist', function(req, res) {
  var db = req.db;
  var collection = db.get('bondlist');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to adduser. */
router.post('/bondsList', function(req, res) {
    var db = req.db;
    var collection = db.get('bondlist');
    collection.insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  });

  /* DELETE to deleteuser. */
router.delete('/deletebond/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('bondlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
      res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
  });

  /* Update a bond */
router.put('/updatebond/:id', function(req, res) {
    var db = req.db;
    var collection = db.get("bondlist");

    
    collection.findById(req.params.id, function(err, course) {
        if (!collection)
          return next(new Error('Could not load Document'));
        else {
          collection.taxable = req.body.taxable;
          collection.symbol = req.body.symbol;
          collection.coupon_rate = req.body.coupon_rate;
          collection.call_amount = req.body.call_amount;
          collection.maturity = req.body.maturity;
          collection.maturity_amount = req.body.maturity_amount;
          collection.purchase_date = req.body.purchase_date;
          collection.call_date = req.body.call_date;
          collection.pmt_day = req.body.pmt_day;
          collection.pmt_month = req.body.pmt_month;
    
          collection.save().then(collection => {
              res.json('Successfully Updated');
          })
          .catch(err => {
                res.status(400).send("unable to update the database");
          });
        }
      });
  });

module.exports = router;