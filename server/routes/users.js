const express=require('express');
const router=express.Router();
const usercontroller=require('../contorller/usercontrollers');


router.get('/',usercontroller.view);
router.post('/',usercontroller.find);
router.get('/adduser',usercontroller.form);
router.post('/adduser',usercontroller.create);
router.get('/edituser/:id',usercontroller.edit);
router.post('/edituser/:id',usercontroller.update);
router.get('/viewuser/:id',usercontroller.ViewBar);
router.get('/:id',usercontroller.delete);




module.exports = router;