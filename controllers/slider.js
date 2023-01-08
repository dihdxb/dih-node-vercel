const Slider = require('../models/Slider');

const { cloudinary } = require('../utils/cloudinary');

module.exports.addSlider = async (req, res) => {
    try {

        const fileStr = req.body.image;
        const uploadedRes = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dih_blogs'
        })

        const slider = await Slider.findOne({page: req.body.page});
        
        if(slider) {
            console.log(slider)
            slider.images.push({fileUrl: uploadedRes.secure_url});
            slider.save();

            return res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
                data: slider
            });
        } else {
            const newSlider = new Slider({
                page: req.body.page,
                images: [{fileUrl: uploadedRes.secure_url}]
            })
    
            await newSlider.save();

            return res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
                data: newSlider
            });
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getAllSliders = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Sliders fetched successfully",
            data: await Slider.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.deleteSlider = async (req, res) => {
    try {
        
        const slider = await Slider.findOne({ page: "home" });
        //await Slider.deleteOne({ _id: req.params.id })
        for (let i = 0; i < slider.images.length; i++) {
            if(slider.images[i].id === req.params.id) {

                const fileName = slider.images[i].fileUrl.split('/')[8];

                await cloudinary.uploader.destroy(`dih_blogs/${fileName.split('.')[0]}`, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }
                    else console.log(result); 
                });

                slider.images.splice(i, 1);
                slider.save();

                return res.status(200).json({
                    success: true,
                    message: "Image deleted successfully",
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}