const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;

class Libros {
    collection = null;
    constructor() {
      
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Libros');
        if (process.env.MIGRATE === 'true') {
        }
      })
      .catch((err) => { console.error(err) });
  }


//NEW
async new(idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros) {
    const newLibros = {
      idLibros, 
      nombreLibros, 
      precioLibros, 
      editorialLibros, 
      categoriaLibros, 
      autorLibros
    };
    const rslt = await this.collection.insertOne(newLibros);
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
  async updateOne(id, idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros) {
    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        idLibros, 
        nombreLibros, 
        precioLibros, 
        editorialLibros, 
        categoriaLibros, 
        autorLibros
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

module.exports = Libros;