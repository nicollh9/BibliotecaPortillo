const express = require('express');
const router = express.Router();


const Libros = new require('../../../../dao/libros/libros.model');
const librosModel = new Libros();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Libros',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    })
}); 

  //ROUTER.POST
  router.post('/new', async (req, res) => {
    const {idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros} = req.body;
    try {
      rslt = await librosModel.new(idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros);
      res.status(200).json(
        {
          status: 'ok',
          result: rslt
        });
    } catch (ex) {
      console.log(ex);
      res.status(500).json(
        {
          status: 'failed',
          result: {}
        });
    }
  }); 
  
  //ROUTER.PUT
  router.put('/update/:id', async (req, res) => {
    try{
      const {idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros} = req.body;
      const { id } = req.params;
      const result = await librosModel.updateOne(id, idLibros, nombreLibros, precioLibros, editorialLibros, categoriaLibros, autorLibros);
      res.status(200).json({
        status:'ok',
        result
      });
    } catch(ex){
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
    
  //ROUTER.DELETE
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await librosModel.deleteOne(id);
      res.status(200).json({
        status: 'ok',
        result
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });

  //GET
router.get('/all', async (req, res) => {
    try {
      console.log("User Request", req.user);
      const rows = await librosModel.getAll();
      res.status(200).json({status:'ok', libros: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );
  
  //BY ID
  router.get('/byid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const row = await librosModel.getById(id);
      res.status(200).json({ status: 'ok', libro: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
  
module.exports = router;