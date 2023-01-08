const jwt = require('jsonwebtoken')

module.exports.login = async (req, res) => {
    try {

        if(req.body.email === "admin@dih.com") {
            if(req.body.pass === "admin@dih*?") {
                const payload = {
                    user: {
                      user: "dih admin"
                    }
                };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '1 year' },
                    (err, token) => {
                      if (err) throw err;
                      return res.status(200).json({
                        success: true,
                        message: "Login successfull",
                        token
                      });
                    }
                );
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credential",
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid credential",
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}