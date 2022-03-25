const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;

class Empleados {
    collection = null;
    constructor() {


    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Empleados');
        if (process.env.MIGRATE === 'true') {
        }
      })
      .catch((err) => { console.error(err) });
  }


//NEW
async new(idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado) {
    const newEmpleados = {
      idEmpleado, 
      nombreEmpleado, 
      apellidoEmpleado, 
      direccionEmpleado, 
      edadEmpleado, 
      sexoEmpleado
    };
    const rslt = await this.collection.insertOne(newEmpleados);
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
  async updateOne(id, idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado) {
    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        idEmpleado, 
        nombreEmpleado, 
        apellidoEmpleado, 
        direccionEmpleado, 
        edadEmpleado, 
        sexoEmpleado
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

module.exports = Empleados;