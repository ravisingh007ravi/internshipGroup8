///_________________________  Import: Model  ________________________________

const internModel = require("../Models/internModel");
const collegeModel = require("../Models/collegeModel");
const validator = require("../Validation/validator.js");

//_________________________  post api: Create  ________________________________

const createIntern = async (req, res) => {
    try {

        const data = req.body;
        const { name, mobile, email} = data;

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please Provide Some Data" });

        if (!validator.isValidName(name)) return res.status(400).send({ status: false, msg: "Please Provide a Name" });

        if (!validator.isValidMobileNo(mobile)) return res.status(404).send({ status: false, msg: "Please Provide a Valid Mobile No" });


        isMobileAlreadyUse = await internModel.findOne({ mobile });

        if (isMobileAlreadyUse) return res.status(400).send({ status: false, msg: "this Mobile No is already registered", });


        if (!validator.isValidEmail(email)) return res.status(404).send({ status: false, msg: "Please Provide a Valid Email Id" });


        //if (!validator.isValid(collegeName)) return res.status(404).send({ status: false, msg: "Please Provide a College Name" });


        const findcollege = await collegeModel.findOne({ name: collegeName }); // checking for the college if any with that name exists
        if (!findcollege) return res.status(400).send({ status: false, msg: "no college with this name exists" });


        if (findcollege.isDeleted === true) return res.status(400).send({ status: false, msg: "This college is no longer with us" });


        const collegeId = findcollege._id;

        const internData = {
            name: name,
            mobile: mobile,
            email: email,
            collegeId: collegeId,
        };

        const findIntern = await internModel.findOne(internData);

        if (findIntern) return res.status(400).send({ status: false, msg: "student intern already exists" });
        

        const createIntern = await internModel.create(internData);
        if (createIntern) return res.status(201).send({status: true,msg: "you have successfully registered",data: createIntern,});
        
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err })
    }
};

//_________________________  Export: Module  ________________________________

module.exports = { createIntern };