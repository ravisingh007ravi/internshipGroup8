//<---------------------------------Import------------------------------>//
const mongoose=require('mongoose');

//<--------------------------Validations : Full Name--------------------->//
const isValidFullName=function(fullName){
    const regexName=/^[a-zA-Z, ]+$/;
    return regexName.test(fullName)
}

//<--------------------------Validations : Name-------------------------->//
const isValidCollgeName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

//<--------------------------Validations : Name-------------------------->//
const isValidName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

//<--------------------------Validations : Mobile No-------------------------->//
const isValidMobileNo=function(mobile){
    const regexMob=/^[0-9]{10}$/;
    return regexMob.test(mobile);
}

//<---------------------------Validations : Email----------------------------->//
const isValidEmail=function(email){
    const regexEmail=/[a-zA-Z_1-90]{3,}@[A-za-z]{3,}[.]{1}[a-zA-Z]{2,}/
    return regexEmail.test(email)
}

//<---------------------------Validations : Password----------------------------->//
const isValidPassword = function (password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
//<---------------------------Validations : Values------------------------------->//
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value == "string" && value.trim().length === 0) return false;
    return true;
  };
  
//<---------------------------Validations :  ObjectId------------------------------->//
const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId);
  };
  
//<------------------------------Export : Modules---------------------------------->//
module.exports = {isValid,isValidCollgeName,isValidMobileNo,isValidEmail,isValidFullName,isValidName,isValidPassword,isValidObjectId};