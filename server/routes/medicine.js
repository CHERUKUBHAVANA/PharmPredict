const express = require('express')

const router = express.Router()

const { addMedicine, displayMedicine, searchMedicine } = require('../controllers/medicine')

router.post('/add-medicine', addMedicine)
router.get('/display-medicine', displayMedicine)
router.get('/search-medicine', searchMedicine)
module.exports = router // {}