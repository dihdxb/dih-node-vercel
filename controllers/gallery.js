const Gallery = require('../models/Gallery');

const { cloudinary } = require('../utils/cloudinary');

module.exports.addImage = async (req, res) => {
    try {

        const fileStr = req.body.image;
        const uploadedRes = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dih_blogs'
        })

        const newImage = new Gallery({
            category: req.body.category,
            imageUrl: uploadedRes.secure_url
        })

        await newImage.save();

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: newImage
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}; 

module.exports.getImages = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Image fetched successfully",
            data: await Gallery.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports.deleteImage = async (req, res) => {
    try {

        const image = await Gallery.findOne({ _id: req.params.id });

        const fileName = image.imageUrl.split('/')[8];

        await cloudinary.uploader.destroy(`dih_blogs/${fileName.split('.')[0]}`, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            else console.log(result); 
        });

        await Gallery.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}; 