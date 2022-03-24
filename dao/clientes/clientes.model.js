const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
//const getDb = require('../db')
let db = null;

class Clientes {
    collection = null;
    constructor() {

        /*getDb()
            .then((database) => {
                db = database;
                if (process.env.MIGRATE === 'true') {
                    const createStatement = 'CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, idCliente TEXT, nombreCliente TEXT, apellidoCliente TEXT, direccionCliente TEXT, edadCliente TEXT, sexoCliente TEXT);';
                    db.run(createStatement);
                }
            })
            .catch((err) => { console.error(err) });
    }*/

    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Clientes');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }


//NEW
async new(idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente) {
    const newClientes = {
        idCliente, 
        nombreCliente, 
        apellidoCliente, 
        direccionCliente, 
        edadCliente, 
        sexoCliente
    };
    const rslt = await this.collection.insertOne(newClientes);
    return rslt;
  }

//GET ALL
  async getAll() {
    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

//GET BYID
  async getById(id) {
    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

//UPDATE ONE
  async updateOne(id, idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente) {
    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        idCliente, 
        nombreCliente,
        apellidoCliente, 
        direccionCliente, 
        edadCliente, 
        sexoCliente
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }  
 
  //DELETE
  async deleteOne(id) {
    const filter = {_id: new ObjectId(id)};
    return await this.collection.deleteOne(filter);
  }
}

module.exports = Clientes;