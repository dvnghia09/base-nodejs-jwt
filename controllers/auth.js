const Jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const SendMail = require("../utilities/SendMail")

const authController = {
    // register
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            // create new use
            const newUser = await new User({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                phone: req.body.phone,
            })
            // save database
            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // LONG IN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});

            if (!user) {
                res.status(404).json("Wrong username!");
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password)

            if (!validPassword) {
                res.status(404).json("Wrong password!");
            }

            if (user && validPassword) {
                const access_token = Jwt.sign({
                    id: user.id,
                    admin: user.admin
                },
                process.env.JWT_ACCESS_KEY,
                {expiresIn: "1d"}
                )
                const refresh_token = Jwt.sign({
                    id: user.id,
                    admin: user.admin
                },
                process.env.JWT_ACCESS_KEY,
                {expiresIn: "30d"}
                ) 
                // Lưu refreshToken vào cookie
                // res.cookie("refreshToken", refresh_token, {
                //     httpOnly: true,
                //     secure: false,
                //     path: "/",
                //     sameSite: "strict",
                // })

                // Không trả về password
                const {password, ...others} = user._doc;
                res.status(200).json({...others, access_token, refresh_token});
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    // refreshToken 
    refreshToken: async (req, res) => {
        const refreshToken = req.body.refresh_token;
        if (!refreshToken) return res.status(401).json("You are not authenticated");

        Jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                res.status(403).json(err);
            }

            const newAccessToken = Jwt.sign({
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30s"}
            )

            res.status(200).json({access_token: newAccessToken, refresh_token: refreshToken});
        })
    },

    forgotPassword: async (req, res) => {
        const {email} = req.body
        
        if (!email) return res.status(406).json({ error: true, message: "No data transmitted" });

        const user = await User.findOne({email: email});

        if (!user) return res.status(400).json({error: true, message: "Email account does not exist"})

        let userResetPassword = {
            id: user.id,
            email: user.email,
            name: user.name,
        };

        let refresh_token = await Jwt.sign(userResetPassword, process.env.JWT_ACCESS_KEY, {expiresIn: "120s"});
        const link = `http://localhost:3000/password-reset/${refresh_token}`;
 
        await SendMail(user.email, "Nghia dv password reset", `<a href="${link}">Reset Password</a>`);
      
        return res.status(200).json({error: false, message: "Successful"})
    }
}

module.exports = authController;