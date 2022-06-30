const collegeModel = require("../model/collegeModel")
const { isValidName, isValid, isValidUrl, isValidMobile, isValidEmail, isValidCollegeName } = require("../Validator/validator")

//POST /functionup/colleges
const createCollege = async function (req, res) {
    try {
        let data = req.body;
       
        if (!('name' in data) || !('fullName' in data) || !("logoLink" in data))
            return res.status(400).send({ status: false, msg: "name,fullName and logoLink can not be empty" })
        if (!isValid(data.name)) return res.status(400).send({ status: false, msg: "name is required" })
        if (!isValidCollegeName(data.name)) return res.status(400).send({ status: false, msg: "collegeName is not valid" });
        if (!isValid(data.fullName)) return res.status(400).send({ status: false, msg: "fullName is required" })
        if (!isValidName(data.fullName)) return res.status(400).send({ status: false, msg: "fullName is not valid" });
        if (!isValid(data.logoLink)) return res.status(400).send({ status: false, msg: "url can not be empty" });

        if (!isValidUrl(data.logoLink)) return res.status(400).send({ status: false, msg: "not a valid url" })
        if (await collegeModel.findOne({ logoLink: data.logoLink }))
            return res.status(400).send({ msg: "Duplicate Logo" })
     

        if (await collegeModel.findOne({ name:data.name }))
            return res.status(400).send({ msg: "This College Short Name is already exist" })
        if (await collegeModel.findOne({ fullName: data.fullName }))
            return res.status(400).send({ msg: "This College Full is already exist" })

        let savedData = await collegeModel.create(data);

        return res.status(201).send({ status: true, msg: savedData });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
module.exports = {
    createCollege
}