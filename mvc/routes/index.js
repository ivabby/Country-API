var express = require('express');
var router = express.Router();

let indexCtrl = require("../controllers/index");


router.get('/', indexCtrl.getIndex);
router.get('/example', indexCtrl.getExample);


router.get('/example/request', indexCtrl.getReqExample);
router.post('/example/request', indexCtrl.postReqExample);
router.put('/example/request', indexCtrl.putReqExample);
router.delete('/example/request', indexCtrl.deleteReqExample);
router.get('/restful' , indexCtrl.getRestful);
router.get('/status-codes' , indexCtrl.getStatusCode);



module.exports = router;
