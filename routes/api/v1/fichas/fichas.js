const express = require('express');
const router = express.Router();


const Fichas = new require('../../../../dao/fichas/fichas.model');
const fichasModel = new Fichas();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Fichas',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    })
}); 

  //ROUTER.POST
  router.post('/new', async (req, res) => {
    const {idFichas, fechaInicial, fechaLimite,nombreLibros,nombreCliente,nombreEmpleado} = req.body;
    try {
      rslt = await fichasModel.new(idFichas, fechaInicial, fechaLimite,nombreLibros,nombreCliente,nombreEmpleado);
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
      const {idFichas, fechaInicial, fechaLimite,nombreLibros,nombreCliente,nombreEmpleado} = req.body;
      const { id } = req.params;
      const result = await fichasModel.updateOne(id, idFichas, fechaInicial, fechaLimite,nombreLibros,nombreCliente,nombreEmpleado);
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
      const result = await fichasModel.deleteOne(id);
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
      const rows = await fichasModel.getAll();
      res.status(200).json({status:'ok', fichas: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );
  
  //BY ID
  router.get('/byid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const row = await fichasModel.getById(id);
      res.status(200).json({ status: 'ok', ficha: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
  
module.exports = router;