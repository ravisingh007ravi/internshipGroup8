//_________________________  Imorting : Packages ________________________________

const express = require('express');
const router = express.Router();

//_________________________  Require: Modules  ________________________________

const { createCollege, collegeDetails } = require("../Controllers/collegeController.js")
const { createIntern } = require("../Controllers/internController.js")

//_________________________  post api: Create  ________________________________

router.post("/functionup/colleges", createCollege)
//_________________________  post api: Create  ________________________________
router.post("/functionup/interns", createIntern)
// //_________________________  get api: Fetch  ________________________________
router.get("/functionup/collegeDetails", collegeDetails)

//_________________________  Export: Route  ________________________________
module.exports = router;