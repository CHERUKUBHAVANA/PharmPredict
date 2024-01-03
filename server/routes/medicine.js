const express = require('express')

const router = express.Router()

const { addMedicine } = require('../controllers/medicine')

router.post('/add-medicine', addMedicine)
module.exports = router // {}