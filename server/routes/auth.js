const express = require('express')
const {signup, accountActivation, signin, forgotPassword, resetPassword} = require('../controllers/auth')
const { userSignupvalidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth')
const { runValidation } = require('../validators')

const router = express.Router()

router.post('/signup',userSignupvalidator, runValidation, signup)
router.post('/accountActivation', accountActivation)
router.post('/signin',userSigninValidator, runValidation, signin)
router.post('/forgotPassword', forgotPasswordValidator, runValidation, forgotPassword)
router.post('/resetPassword',resetPasswordValidator, runValidation, resetPassword)
module.exports = router