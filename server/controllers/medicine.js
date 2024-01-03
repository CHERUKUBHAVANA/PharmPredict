const Medicine = require('../models/medicine')

exports.addMedicine = (req, res) => {
    console.log(req.body)
    const { name, substitute0, substitute1, substitute2, substitute3, substitute4, sideEffect0, sideEffect1, sideEffect2, sideEffect3, sideEffect4, use0, use1, use2, use3, use4, ChemicalClass, ActionClass } = req.body;
    const newMedicine = new Medicine({ name, substitute0, substitute1, substitute2, substitute3, substitute4, sideEffect0, sideEffect1, sideEffect2, sideEffect3, sideEffect4, use0, use1, use2, use3, use4, ChemicalClass, ActionClass })
    newMedicine.save()
        .then(() => {
            return res.json({
                message: 'Medicine added successfully'
            })
        })
        .catch((err) => {
            return res.status(400).json({
                error: 'Error saving medicine in database, Try again'
            })
        })
}