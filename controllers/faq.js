const Faq = require('../models/Faq');

module.exports.addFaq = async (req, res) => {
    try {
        const newFaq = new Faq({
            question: req.body.question,
            answer: req.body.answer
        });

        await newFaq.save();
        return res.status(200).json({
            success: true,
            message: "Faq added successfully",
            data: newFaq
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getAllFaqs = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Image fetched successfully",
            data: await Faq.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.deleteFaq = async (req, res) => {
    try {
        await Faq.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            message: "Faq deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
