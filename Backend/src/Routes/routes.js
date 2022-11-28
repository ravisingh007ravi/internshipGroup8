//<----------------------Importing : Packages---------------------->//
const express = require('express');
const router = express.Router();

//<----------------------Require: Modules------------------------>//
const { createCollege, collegeDetails } = require("../Controllers/collegeController.js");
const { createIntern } = require("../Controllers/internController.js");

//<-------------This API used for Create Colleges----------------->//
router.post("/functionup/colleges", createCollege)
//<-------------This API used for Create Internship---------------->//
router.post("/functionup/interns", createIntern)
//<-------------This API used from get College data---------------->//
router.get("/functionup/collegeDetails", collegeDetails)

//<---------------------Export Route Module------------------------>//
module.exports = router;