const Blog = require('../models/Blog');

const { getFormatDate } = require('../utils/common');
const { cloudinary } = require('../utils/cloudinary');

module.exports.createBlog = async (req, res) => {
    //console.log(req.body);
    try {
        const fileStr = req.body.avatar;
        const uploadedRes = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dih_blogs'
        })
        //console.log(uploadedRes);

        const newBlog = new Blog({
            title: req.body.title,
            data: req.body.data,
            avatar: uploadedRes.secure_url,
            createdOn: getFormatDate(new Date)
        });

        await newBlog.save();

        return res.status(200).json({
            success: true,
            message: "Blog created successfully",
            data: newBlog
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.getBlogs = async (req, res) => {
    try {

        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: await Blog.find()
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports.deleteBlog = async (req, res) => {
    try {

        const blog = await Blog.findOne({ _id: req.params.id });

        const fileName = blog.avatar.split('/')[8];

        await cloudinary.uploader.destroy(`dih_blogs/${fileName.split('.')[0]}`, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }
            else console.log(result); 
        });

        await Blog.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}