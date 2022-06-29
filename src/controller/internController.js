const { default: mongoose } = require("mongoose");
const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel");
const { isValid, isValidName, isValidUrl, isValidEmail, isValidMobile } = require("../validator/validator");

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let mobile = data.mobile
        let email = data.email
        if (!isValid(data.collegeId)) return res.status(400).send({ status: false, msg: "collegeId is required" })
        if (!mongoose.isValidObjectId(data.collegeId)) return res.status(400).send({ status: false, msg: "please enter valid id" })
        let collegeid = await collegeModel.findById(data.collegeId)
        if (!collegeid) return res.status(404).send({ status: false, msg: "college not found" })

        let mobileAndEmail = await internModel.findOne({ $and: [{ mobile: mobile, email: email }] })
        if (mobileAndEmail) return res.status(400).send({ status: false, msg: "Either mobile No. or email is already registered" })
        console.log(mobileAndEmail)

        if (!isValid(data.name)) return res.status(400).send({ status: false, msg: "name is required" })
        if (!isValidName(data.name)) return res.status(400).send({ status: false, msg: "name is not valid" });

        if (!isValid(email)) return res.status(400).send({ status: false, msg: "email can not be empty" });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: "Invalid email" })

        if (!isValid(mobile)) return res.status(400).send({ status: false, msg: "mobile can not be empty" });
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, msg: "Invalid mobile" })

        let savedData = await internModel.create(data)
        return res.status(201).send({ status: true, msg: savedData })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

//GET /functionup/collegeDetails via queryparams
const getCollege = async function(req,res){
    //try{
        let query = req.query
        // console.log(query)
        let data = Object.keys(query)
        if (!data.length) return res.status(411).send({ status: false, msg: "Data can not be empty" });
    //    let colle=await collegeModel.find(query).select({_id:1})
    //    console.log(colle)
    //     //let auth = blog.find(e => e.authorId == authorisedId)
    //    let myId=colle.find(x=>x._id)
    //    //console.log(myId._id.toString())
       
        //let collegeIntern=await internModel.find({myId:myId._id.toString()})//.populate("collegeId")
        let collegeDetail=await collegeModel.find(query)//.populate("collegeId")
        console.log(collegeDetail)
        let collegeid=collegeDetail.find(x=>x._id)
        console.log(collegeid._id.toString())
       let interDetail=await internModel.find({collegeId:collegeid}).populate("collegeId")//.sort({"collegeId":collegeid._id.toString()})
        
        // console.log(interDetail)
       //console.log(collegeDetail)
    //    let finalDetail=collegeDetail.interns
    //    console.log(finalDetail)
    //    finalDetail.push(interDetail)
    
       
        return res.status(200).send({status:true,msg:interDetail})



    // } catch(err){
    //     return res.status(500).send({status:false, msg: err.message})
    // }


}

module.exports = { createIntern ,getCollege}