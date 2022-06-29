const express = require('express');
const router = express.Router();
const collegeController=require("../controller/collegeController")
const internController = require("../controller/internController")


router.post("/functionup/colleges" ,collegeController.createCollege);
router.post("/functionup/interns", internController.createIntern)
router.get("/functionup/collegeDetails", internController.getCollege)


//if user will hit wrong url
router.all("../**",function(req,res){
    res.status(404).send({status:false,msg:"No such site exist"})
})

module.exports = router;