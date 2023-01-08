const Banner = require('../models/Banner')

const { cloudinary } = require('../utils/cloudinary');

module.exports.addBanner = async (req, res) => {
    try {
        const ifBanner = await Banner.findOne({ page: req.body.page});

        const fileStr1 = req.body.largeImage;
        const uploadedRes1 = await cloudinary.uploader.upload(fileStr1, {
            upload_preset: 'dih_blogs'
        })

        const fileStr2 = req.body.mobileImage;
        const uploadedRes2 = await cloudinary.uploader.upload(fileStr2, {
            upload_preset: 'dih_blogs'
        })
        //console.log(uploadedRes);

        if(ifBanner) {
            const fileName1 = ifBanner.largeImage.split('/')[8];
            //console.log(fileName)
            await cloudinary.uploader.destroy(`dih_blogs/${fileName1.split('.')[0]}`, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                else console.log(result); 
            });

            const fileName2 = ifBanner.mobileImage.split('/')[8];
            await cloudinary.uploader.destroy(`dih_blogs/${fileName2.split('.')[0]}`, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }
                else console.log(result); 
            });

            ifBanner.largeImage = uploadedRes1.secure_url;
            ifBanner.mobileImage = uploadedRes2.secure_url;
            ifBanner.save();

            return res.status(200).json({
                success: true,
                message: "Banner uploaded successfully",
                data: ifBanner
            });
        } else {
            const newBanner = new Banner({
                page: req.body.page,
                largeImage: uploadedRes1.secure_url,
                mobileImage: uploadedRes2.secure_url
            });
            await newBanner.save();

            return res.status(200).json({
                success: true,
                message: "Banner uploaded successfully",
                data: newBanner
            });
        }
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getBanners = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Banner uploaded successfully",
            data: await Banner.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};