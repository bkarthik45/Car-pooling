import UserModel from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from "../config/emailConfig.js";


class UserController{
    static userRegistration = async(req,res)=>{
        const {name, email, password, password_confirmation, tc} = req.body
        const user = await UserModel.findOne({email:email})
    
    if(user){
        res.send({"status":"failed","message":"Email already exists"})
    } else {
        if( name && email && password&& password_confirmation && tc) {
            if(password === password_confirmation){
               try{
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                const doc = new UserModel({
                    name:name,
                    email:email,
                    password:hashPassword,
                    tc,tc
                })
                await doc.save()
                const saved_user = await UserModel.findOne({email:email})

                //generate JWT token 
                const token = jwt.sign({userID: saved_user._id},
                    process.env.JWT_SECRET_KEY,{expiresIn:'5d'}
                )
                res.status(201).send({"status":"Success","message":"registered Successfully ", "token":token})


               }catch(error){
                console.log(error)
                res.send({"status":"failed","message":"unable to register "})

               }
            }else{
                res.send({"status":"failed","message":"password and password_confirmation doesn't match "})

            }

        } else{
            res.send({"status":"failed","message":"All fields are required"})

        }

    }
}
static userLogin = async(req,res)=>{
    try{
        const {email, password}  = req.body
        if(email && password){
            const user = await UserModel.findOne({email: email})
            if(user !=null){
                const isMatch = await bcrypt.compare(password,user.password)
                if((user.email === email) && isMatch){
                     //generate JWT token 
                const token = jwt.sign({userID: user._id},
                    process.env.JWT_SECRET_KEY,{expiresIn:'5d'}
                )
                    res.send({"status":"Success","message":"Login Success","token":token})



                }else{
                    res.send({"status":"failed","message":"email or password not matched "})

                }

            }else{
                res.send({"status":"failed","message":"you are not a registered User "})

            }

        }else{
            res.send({"status":"failed","message":"All fields are required"})

        }

    } catch(error){
        res.send({"status":"failed","message":"Unable to login "})


    }
}

static changeuserPassword = async(req,res)=>{
    const{password,password_confirmation}  = req.body
    if(password && password_confirmation ){
        if(password !== password_confirmation ){
            res.send({"status":"failed","message":"New Password and confirm new  password  doesn't match "})
        } else{
            const salt = await bcrypt.genSalt(10)
            const newHashPassword = await bcrypt.hash(password, salt)
            await UserModel.findByIdAndUpdate(req.user._id, {$set:{password: newHashPassword}})
            res.send ({"status": "Success","message":"Password changes succesfully"})
               }

    }else{
        res.send({"status":"failed","message":"All fields are required"})

    }
}
static loggedUser = async(req,res)=>{
    res.send({"user":req.user})
}
static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if (email) {
        try {
            const user = await UserModel.findOne({ email: email });

            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY;
                const token = jwt.sign({ userID: user._id }, secret, {
                    expiresIn: '15m'
                });

                const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
                console.log("link:", link);
                //send email
                let info = await transporter.sendMail({
                    from:process.env.EMAIL_FROM,
                    to: user.email,
                    subject:"Password reset link",
                    html:`<a href=${link}>click here</a>nro reset your password`
                })

                // You might want to send this link via email in a real-world app
                res.send({ status: "success", message: "Password reset link sent", "link": link , "info": info});
            } else {
                res.send({ status: "failed", message: "Email doesn't exist" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: "failed", message: "Something went wrong" });
        }
    } else {
        res.send({ status: "failed", message: "Email is required" });
    }
}

static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.send({ status: "failed", message: "User not found" });
        }

        const new_secret = user._id + process.env.JWT_SECRET_KEY;

        // Verify the token
        jwt.verify(token, new_secret);

        // Validate passwords
        if (password && password_confirmation) {
            if (password !== password_confirmation) {
                return res.send({ status: "failed", message: "Password and confirm password do not match" });
            }

            const salt = await bcrypt.genSalt(10);
            const newHashPassword = await bcrypt.hash(password, salt);
            await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });

            res.send({ status: "success", message: "Password reset successful" });
        } else {
            res.send({ status: "failed", message: "All fields are required" });
        }
    } catch (error) {
        console.error("Password reset error:", error.message);
        res.send({ status: "failed", message: "Invalid or expired token" });
    }
};


static getUserProfile = async(req,res)=>{
    try{
        const user= await UserModel.findById(req.user._id).select('-password');
        res.status(200).json({status:"success", user});
    
    }catch(error){
        console.error(error);
        res.status(500).json({status:"failed", message:"Unable to fetch Profile"})
    }
}

static updateUserProfile = async(req,res)=>{
    const {name, phone, isDriver, carModel, carPlate, seats} = req.body
    try{
        const updateData = {
            name,phone,isDriver,carModel,carPlate,seats,
        };
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            updateData,{new:true}
        ).select('-password');
        res.status(200).json({
            status:"success",message:"Profile updated successfully",
            user:updatedUser
        });

    }catch(error){
        console.log(error);
        res.status(500).json({status:"failed", message:"Unable to update Profile"})


    }
}

}


export default UserController;
