const Form = require('../models/Form')

module.exports.submitForm = async (req, res) => {
    try {
        console.log(req.body);
        const newForm = new Form({
            ...req.body
        });

        await newForm.save();
        return res.status(200).json({
            success: true,
            message: "Contact form submitted successfully",
            data: newForm
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getForms = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Contact forms fetched successfully",
            data: await Form.find()
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
