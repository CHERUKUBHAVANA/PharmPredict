const express = require('express')
const {signup, accountActivation, signin, forgotPassword, resetPassword, addToCart, getCart} = require('../controllers/auth')
const { userSignupvalidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator } = require('../validators/auth')
const { runValidation } = require('../validators')

const router = express.Router()

router.post('/signup',userSignupvalidator, runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin',userSigninValidator, runValidation, signin)
router.put('/forgot-password', forgotPasswordValidator, runValidation, forgotPassword)
router.put('/reset-password',resetPasswordValidator, runValidation, resetPassword)
router.post('/add-to-cart', addToCart)
router.get('/user-cart/:id', getCart)
module.exports = router