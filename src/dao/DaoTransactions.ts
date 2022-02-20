import Transaction from '../models/transactions.model';
import { typesTransaction } from '../interfaces/typesTransaction';

/**
     * Clase que se encarga de manejar las consultas hacia la base de datos en la colección Transaction.
     * @author Miguel García
*/
export class DaoTransactions {


  /**
       * Método que se encarga de crear un registro en la colección Transaction.
       * @param {typesTransaction} data
  */
  public createTransaction(data: typesTransaction) {

    return new Promise<string>(async (resolve, reject) => {
      try {
        const transaction = new Transaction(data);
        await transaction.save();
        resolve('Transaction created!')

      } catch (error) {
        console.log(error);
        reject(error)
      }
    })
  }

  /**
       * Método que se encarga de consultar por usuario la lista de transacciones ejecutadas.
       * @param {string} username
  */
  public async getTransactionByUsername(username: string) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let results = await Transaction.find({ username: username });
        resolve(results);
      } catch (error) {
        console.log(error);
        reject(error)
      }
    })


  }

}