const Review = require('../models/Review');

module.exports.addReview = async (req, res) => {
    try {
        const newReview = new Review({
            title: req.body.title,
            name: req.body.name,
            place: req.body.place,
            data: req.body.data
        });

        await newReview.save();
        return res.status(200).json({
            success: true,
            message: "Review added successfully",
            data: newReview
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getAllReviews = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Image fetched successfully",
            data: await Review.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.deleteReview = async (req, res) => {
    try {
        await Review.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
