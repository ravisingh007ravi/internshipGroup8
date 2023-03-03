//<----------------------Importing : Packages---------------------->//
const internModel = require("../Models/internModel");
const collegeModel = require("../Models/collegeModel");
const validator = require("../Validation/validator");

//<-------------This API used for Create Internship---------------->//
const createIntern = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  try {
    const data = req.body;
    const { name, mobile, email, collegeName } = data;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please Provide Some Data" });

    if (!name) return res.status(404).send({ status: false, msg: "Please Provide a Name" });

    if (name.trim().length == 0) return res.status(400).send({ status: false, msg: "Please Provide a String Name" });

    if (!validator.isValidName(name)) return res.status(400).send({ status: false, msg: "Please Provide a Name" });

    if (!validator.isValidMobileNo(mobile)) return res.status(400).send({ status: false, msg: "Please Provide a Valid Mobile No" });

    isEmailAlreadyUse = await internModel.findOne({ email });
    if (isEmailAlreadyUse) return res.status(400).send({status: false,msg: "this Email is already registered"});

    isMobileAlreadyUse = await internModel.findOne({ mobile });
    if (isMobileAlreadyUse) return res.status(400).send({ status: false, msg: "this Mobile No is already registered", });

    if (!validator.isValidEmail(email)) return res.status(400).send({ status: false, msg: "Please Provide a Valid Email Id" });

    if (!validator.isValid(collegeName)) return res.status(400).send({ status: false, msg: "Please Provide a College Name" });

    const findcollege = await collegeModel.findOne({ name: collegeName });

    if (!findcollege) return res.status(404).send({ status: false, msg: "no college with this name exists" });

    if (findcollege.isDeleted === true) return res.status(400).send({ status: false, msg: "This college is no longer with us" });

    const collegeId = findcollege._id;

    const internData = {
      name: name,
      mobile: mobile,
      email: email,
      collegeId: collegeId
    };

    const findIntern = await internModel.findOne(internData);

    if (findIntern) return res.status(400).send({ status: false, msg: "student intern already exists" });

    const createIntern = await internModel.create(internData);
    if (createIntern) return res.status(201).send({ status: true, msg: "you have successfully registered", data: createIntern, });

  }
  catch (error) { return res.status(500).send({ status: false, error: error.message }); }
};

//<----------------------Export: Module---------------------------->//
module.exports = { createIntern };
