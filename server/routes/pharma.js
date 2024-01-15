const express = require('express')

const router = express.Router()

const {requireSignin, adminMiddleware} = require('../controllers/auth')
const {read, update, viewCart} = require('../controllers/pharma')

router.get('/pharma/:id', requireSignin, read)
router.put('/pharma/update', requireSignin, update)
router.put('/admin/update', requireSignin, adminMiddleware, update)
router.get('/pharma/view-cart', viewCart)
module.exports = router // {}