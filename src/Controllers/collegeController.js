//_________________________  Import: Model  ________________________________

const collegeModel = require("../Models/collegeModel");

const validator = require("../Validation/validator");
const url = require("valid-url");

//_________________________  post api: Create  ________________________________

const createCollege = async (req, res) => {
  try {
    const data = req.body;
    const { name, fullName, logoLink } = data;

    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Some Data" });
    }

    if (!validator.isValidName(name)) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Provide a Valid Name" });
    }

    if (!fullName) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Provide a Valid Full Name" });
    }
    if (!logoLink) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Provide a LogoLink" });
    }
    const validateLogoLink = url.isUri(logoLink);

    if (!validateLogoLink) {
      return res
        .status(404)
        .send({ status: false, msg: "Please Provide a Valid Link" });
    }
    const nameAlreadyRegistered = await collegeModel.findOne({ name });
    if (nameAlreadyRegistered) {
      return res.status(400).send({
        status: false,
        msg: "this college name is already registered",
      });
    }
    const saveData = await collegeModel.create(data);
    return res.status(201).send({
      status: true,
      msg: "Your college has been registered",
      data: saveData,
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { createCollege };
