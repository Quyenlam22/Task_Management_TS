import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../helpers/generate";

//[POST] api/v1/users/register
export const register = async (req: Request, res: Response) => {
    try {
        const existUser = await User.findOne({
            email: req.body.email,
            deleted: false
        })
        
        if(existUser) {
            res.json({
                code: 400,
                message: "Email existed!"
            })
        }
        else{
            req.body.password = md5(req.body.password)
    
            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                token: generateRandomString(20)
            })
        
            await user.save();
            res.json({
                code: "200",
                message: "Success!",
                token: user.token
            });
        }
    } catch (error) {
        res.json({
            code: "400",
            message: "Error!"
        });
    }
}