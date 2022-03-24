const express = require('express');
const router = express.Router();


const Clientes = new require('../../../../dao/clientes/clientes.model');
const clientesModel = new Clientes();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Clientes',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    })
}); 


  //ROUTER.POST
  router.post('/new', async (req, res) => {
    const {idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente } = req.body;
    try {
      rslt = await clientesModel.new(idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente);
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
      const {idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente } = req.body;
      const { id } = req.params;
      const result = await clientesModel.updateOne(id, idCliente, nombreCliente, apellidoCliente, direccionCliente, edadCliente, sexoCliente);
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
      const result = await clientesModel.deleteOne(id);
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
      const rows = await clientesModel.getAll();
      res.status(200).json({status:'ok', clientes: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );
  
  //BY ID
  router.get('/byid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const row = await clientesModel.getById(id);
      res.status(200).json({ status: 'ok', cliente: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
  
module.exports = router;