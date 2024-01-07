const express = require('express')

const router = express.Router()

const { addMedicine, displayMedicine, searchMedicine, predictClass } = require('../controllers/medicine')

router.post('/admin/add-medicine', addMedicine)
router.get('/display-medicine', displayMedicine)
router.get('/search-medicine', searchMedicine)
router.post('/predict-class', predictClass)
module.exports = router // {}