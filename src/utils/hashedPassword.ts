import bcrypt from 'bcrypt';


const hashedPassword = async (password:string) => {

    return new Promise<string>((resolve, reject) => {
        try {
            let passHashed : string = bcrypt.hashSync(password, 12);
            resolve(passHashed)
        } catch (error) {
            reject(error)
        }
    })
    
}

module.exports = {
    hashedPassword
}

