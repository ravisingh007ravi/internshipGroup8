//<----------------------Importing : Packages---------------------->//
const collegeModel = require("../Models/collegeModel.js");
const internModel = require("../Models/internModel.js");
const validator = require("../Validation/validator.js");
const url = require("valid-url");

//<-------------This API used for Create Colleges----------------->//
const createCollege = async (req, res) => {
  try {
    const data = req.body;
    const { name, fullName, logoLink } = data;

    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Please Provide Some Data" });

    if (!name) return res.status(400).send({ status: false, msg: "Please Provide Name" });

    if (!validator.isValidCollgeName(name)) return res.status(400).send({ status: false, msg: "Please Provide a Valid Full Name" });

    if (!fullName) return res.status(400).send({ status: false, msg: "Please Provide FullName" });

    if (!validator.isValidFullName(fullName)) return res.status(400).send({ status: false, msg: "Please Provide a Valid Full Name" });

    if (!logoLink) return res.status(400).send({ status: false, msg: "Please Provide a LogoLink" });

    const validateLogoLink = url.isUri(logoLink);

    if (!validateLogoLink) return res.status(400).send({ status: false, msg: "Please Provide a Valid Link" });

    const nameAlreadyRegistered = await collegeModel.findOne({ name });

    if (nameAlreadyRegistered) return res.status(400).send({ status: false, msg: "this college name is already registered", });

    const saveData = await collegeModel.create(data);
    return res.status(201).send({ status: true, msg: "Your college has been registered", data: saveData });
  }
  catch (error) { res.status(500).send({ status: false, error: error.message }); }
};

//<-------------This API used from get College data---------------->//
const collegeDetails = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  try {
  
    const data = req.query;
    const { collegeName } = data;

    if (Object.keys(data).length == 0) return res.status(404).send({ status: false, msg: "Please Provide a College Name" });

    let findCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ _id: 1, name: 1, logoLink: 1, fullName: 1 });

    if (!findCollege) return res.status(404).send({ status: false, msg: "No college with this name exists" });

    let collegeId = findCollege._id;

    let candidates = await internModel.find({ collegeId: collegeId, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 });

    if (!candidates) return res.status(404).send({ status: false, msg: "no students from this college has applied yet", });

    let details = {
      name: findCollege.name,
      fullName: findCollege.fullName,
      logoLink: findCollege.logoLink,
      interns: candidates,
    };

    return res.status(200).send({ status: true, data: details });

  }
  catch (error) { return res.status(500).send({ status: false, error: error.message }); }
};
//<----------------------Export: Module---------------------------->//
module.exports = { createCollege, collegeDetails };

