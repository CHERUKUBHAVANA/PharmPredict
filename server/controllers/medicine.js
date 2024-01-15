const Medicine = require('../models/medicine')
const { spawn } = require('child_process');
exports.addMedicine = (req, res) => {
    console.log(req.body)
    const { name, substitute0, substitute1, substitute2, substitute3, substitute4, sideEffect0, sideEffect1, sideEffect2, sideEffect3, sideEffect4, use0, use1, use2, use3, use4, ChemicalClass, ActionClass } = req.body;
    const newMedicine = new Medicine({ name, substitute0, substitute1, substitute2, substitute3, substitute4, sideEffect0, sideEffect1, sideEffect2, sideEffect3, sideEffect4, use0, use1, use2, use3, use4, ChemicalClass, ActionClass })
    if (!name) {
        return res.status(400).json({
            error: 'Drug name is required!'
        })
    }
    newMedicine.save()
        .then(() => {
            return res.json({
                message: 'Medicine added successfully'
            })
        })
        .catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: 'Error saving medicine in database, Try again'
            })
        })
}

exports.displayMedicine = (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    Medicine.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then((drugs) => {
            res.json(drugs);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
};


exports.searchMedicine = async (req, res) => {
    const searchTerm = req.query.searchTerm || '';
    try {
        const filteredMedicines = await Medicine.find({ name: { $regex: new RegExp(searchTerm, 'i') } });
        res.json(filteredMedicines);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error searching medicine data' });
    }
}

exports.predictClass = (req, res) => {
    const { input_data } = req.body
    // console.log(input_data[0])
    // const pythonScript = spawn('py', ['C:/Users/bhava/RandomForestModel.py', input_data]);

    // pythonScript.stdout.on('data', (data) => {
    //     const output = data.toString();
    //     res.json({ result: output });
    // });

    // pythonScript.stderr.on('data', (data) => {
    //     console.error(`Python Script Error: ${data}`);
    //     // res.status(500).json({ error: 'Internal Server Error' });
    // });

    // pythonScript.on('close', (code) => {
    //     console.log(`Python Script Closed with Code: ${code}`);
    // });
    const pythonProcess = spawn('py', ['C:/Users/bhava/predict.py', input_data]);

    pythonProcess.stdin.write(JSON.stringify(input_data));
    pythonProcess.stdin.end();

    pythonProcess.stdout.on('data', (data) => {
        const result = JSON.parse(data);
        console.log("Hi")
        console.log(result.predictions);
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
        }
    });
}

exports.viewAnalytics = (req, res) => {

}

