import bcrypt from 'bcrypt';

const comparePassword = async (password:string, passDb:string) => {

    return new Promise<string>((resolve, reject) => {
        try {
            let passHashed : boolean = bcrypt.compareSync(password, passDb);
            !passHashed ? reject('Contraseña incorrecta') : resolve('Usuario logueado');
        } catch (error) {
            reject(error)
        }
    })
    
}

module.exports = {
    comparePassword
}

