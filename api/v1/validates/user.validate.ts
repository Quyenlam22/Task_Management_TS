import { NextFunction, Request, Response } from "express";

export const register = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!req.body.fullName){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại tên!"
        })
        return
    }
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        })
        return
    }
    if(!req.body.password){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        })
        return
    }
    next()
}

export const login = (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if(!req.body.email){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại email!"
        })
        return
    }
    if(!req.body.password){
        res.json({
            code: 400,
            message: "Vui lòng nhập lại mật khẩu!"
        })
        return
    }
    next()
}

// export const forgotPassword = (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if(!req.body.email){
//         res.json({
//             code: 400,
//             message: "Vui lòng nhập lại email!"
//         })
//         return
//     }
//     next()
// }

// export const otpPassword = (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if(!req.body.otp){
//         res.json({
//             code: 400,
//             message: "Vui lòng nhập lại OTP!"
//         })
//         return
//     }
//     next()
// }

// export const resetPassword = (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     if(!req.body.password){
//         res.json({
//             code: 400,
//             message: "Vui lòng nhập lại mật khẩu!"
//         })
//         return
//     }
//     if(!req.body.confirmPassword){
//         res.json({
//             code: 400,
//             message: "Vui lòng nhập lại xác nhận mật khẩu!"
//         })
//         return
//     }
//     if(req.body.password != req.body.confirmPassword){
//         res.json({
//             code: 400,
//             message: "Mật khẩu không khớp!"
//         })
//         return
//     }
//     next()
// }