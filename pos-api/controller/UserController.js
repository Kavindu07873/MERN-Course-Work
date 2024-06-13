const userSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const salt = 10;
const nodemailer = require('nodemailer');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables


const register = (req, resp) => {
    try {
        userSchema.findOne({'email': req.body.email}).then(result => {
            if (result == null) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    if (err) {
                        console.log(err)
                        return resp.status(500).json(err);
                    }
                    console.log("response : " + req.body.email)
                    console.log("response : " + req.body.fullName)
                    console.log("response : " + hash)

                    const user = new userSchema({
                        fullName: req.body.fullName,
                        password: hash,
                        email: req.body.email,
                        activeState: true
                    });
                    console.log(1)
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            // user: 'dilshankavindu071017@gmail.com', // <-- Your Gmail email address
                            // pass: 'dilshan071017', // <-- Your Gmail password
                            user: process.env.GMAIL_USER, // Use environment variables
                            pass: process.env.GMAIL_PASS, // Use environment variables
                        }
                    });
                    console.log(2)
                    const mailOption = {
                        from: process.env.GMAIL_USER,
                        to: req.body.email,
                        subject: 'New Account Creation',
                        text: 'You have Created Your Account!'
                    }
                    console.log(3)
                    await transporter.sendMail(mailOption, (error, info) => {
                        if (error) {
                            console.error('Error sending email:', error);
                            return resp.status(500).json({'error': error});
                        } else {
                            (async () => {
                                try {
                                    const saveResponse = await user.save();
                                    console.log('User saved:', saveResponse);
                                    return resp.status(201).json({'message': 'saved!'});
                                } catch (saveError) {
                                    console.error('Error saving user:', saveError);
                                    return resp.status(500).json(saveError);
                                }
                            })();
                        }
                    });
                })
            } else {
                return resp.status(409).json({'error': 'already exists'});
            }
        })
    } catch (err) {
        console.error('Error in registration process:', err);
        return resp.status(500).json(err);
    }
}

const login = (req, resp) => {
    userSchema.findOne({'email': req.body.email}).then(selectedUser => {
        if (selectedUser !== null) {
            // Load hash from your password DB.
            bcrypt.compare(req.body.password, selectedUser.password, function (err, result) {
                // result == true
                if (err) {
                    return resp.status(500).json({'message': 'internal server error'});
                }

                if (result) {
                    const payload = {
                        email: selectedUser.email
                    }
                    const secretKey = process.env.SECREAT_KEY;
                    const expiresIn = '24h';
                    const token = jsonwebtoken.sign(payload, secretKey, {expiresIn});
                    resp.setHeader('Authorization', `Bearer ${token}`)

                    return resp.status(200).json(token);
                } else {
                    return resp.status(401).json({'message': 'Password is incorrect!'});
                }
            });


        } else {
            return resp.status(404).json({'message': 'not found! '});
        }
    })
}

module.exports = {
    register, login
}