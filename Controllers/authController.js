const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Customer = require('../Models/customer');
const User = require('../Models/user');
const Worker = require('../Models/worker');
// const { hashPassword } = require('../Util/HashPassword');

class authController {
    async adminLogin(req, res) {
        // console.log("hit LogIn");
        if (req.body?.email) {
            const user = await User.findOne({ email: req.body?.email });
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
                if (isPasswordCorrect) {
                    const user_token = jwt.sign({ id: user._id, user_type: user.user_type }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
                    // const customer = await Customer.findOne({ user_id: user.id });
                    const userDetails = {
                        status: 'success',
                        message: "Successfully Logged In",
                        user_token: user_token,
                        user_id: user._id,
                        user_name: user.name,
                        user_contact_no: user.contact_no,
                        user_email: user.email,
                        // customer_id: customer._id,
                        user_type: user.user_type
                    }
                    return res.send(userDetails);
                } else {
                    res.send({ status: "failed", message: "Password Not Match" });
                }
            } else {
                res.send({ status: "failed", message: "User Not Found" });
            }
        }

        if (req.body?.contact_no) {
            const user = await User.findOne({ contact_no: req.body?.contact_no });
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
                if (isPasswordCorrect) {
                    const user_token = jwt.sign({ id: user._id, user_type: user.user_type }, process.env.ACCESS_TOKEN_SECRET);
                    // const customer = await Customer.findOne({ user_id: user.id });
                    const userDetails = JSON.stringify({
                        status: 'success',
                        message: "Successfully Logged In",
                        user_token: user_token,
                        user_id: user._id,
                        user_name: user.name,
                        user_contact_no: user.contact_no,
                        user_email: user.email,
                        // customer_id: customer._id,
                        user_type: user.user_type
                    });
                    return res.send(userDetails);
                } else {
                    res.send({ status: "failed", message: "Password Not Match" });
                }
            } else {
                res.send({ status: "failed", message: "User Not Found" });
            }
        }
    }
    async workerLogin(req, res)
    {
        // console.log("hit")
        if(req.body?.username)
        {
            const worker=await Worker.findOne({username: req.body.username})
            // console.log(worker);
            const isPasswordCorrect = await bcrypt.compare(req.body.password, worker.password);
            if (isPasswordCorrect) {
                const worker_token = jwt.sign({ id: worker._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '6h' });
                const workerDetails = {
                    status: 'success',
                    message: "Successfully Logged In",
                    worker_token: worker_token,
                    worker_id: worker._id,
                    worker_username: worker.username,
                    worker_contact_no: worker.contact,
                }
                console.log(workerDetails);
                return res.send(workerDetails);
            } else {
                res.send({ status: "failed", message: "Password Not Match" });
            }
        }
    }

    async checkValidJWT(req, res,) {
        const user = await User.findOne({ _id: req?.decoded?.id });
        res.send({ status: "success", message: "valid jwt", id: user?._id, user_type: user?.user_type });
    }
}

module.exports = new authController();