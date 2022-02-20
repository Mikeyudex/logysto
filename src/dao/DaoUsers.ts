import User from "../models/user.model";

export class DaoUsers {


  public createUser(data: any) {

    return new Promise<string>(async (resolve, reject) => {
      try {
        const user = new User(data);
        await user.save();
        resolve('User created!')

      } catch (error) {
        console.log(error);
        reject(error)
      }
    })
  }

  public async getUserByUsername(username: string) {
    return new Promise<any>((resolve, reject) => {
      try {
        User.find({ username }, (error, user: any) => {
          if (error) reject(error);
          resolve(user)
        })
        
      } catch (error) {
        console.log(error);
        reject(error)
      }
    })


  }

}