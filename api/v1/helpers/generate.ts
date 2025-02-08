export const generateRandomString = (length: number): string => {
    const character: string = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz0123456789"
    let res: string = ""
    for (let i = 0; i < length; i++) {
        res += character.charAt(Math.floor(Math.random() * character.length))
    }
    return res
}

export const generateRandomNumber = (length: number): string => {
    const character: string = "0123456789"
    let res: string = ""
    for (let i = 0; i < length; i++) {
        res += character.charAt(Math.floor(Math.random() * character.length))
    }
    return res
}