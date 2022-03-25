const express = require('express');
const router = express.Router();


const Empleados = new require('../../../../dao/empleados/empleados.model');
const empleadosModel = new Empleados();

router.get('/', (req, res) => {
    res.status(200).json({
        endpoint: 'Empleados',
        updates: new Date(2022, 0, 19, 18, 41, 00)
    })
}); 


  //ROUTER.POST
  router.post('/new', async (req, res) => {
    const {idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado} = req.body;
    try {
      rslt = await empleadosModel.new(idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado);
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
      const {idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado} = req.body;
      const { id } = req.params;
      const result = await empleadosModel.updateOne(id, idEmpleado, nombreEmpleado, apellidoEmpleado, direccionEmpleado, edadEmpleado, sexoEmpleado);
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
      const result = await empleadosModel.deleteOne(id);
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
      const rows = await empleadosModel.getAll();
      res.status(200).json({status:'ok', empleados: rows});
    } catch (ex) {
      console.log(ex);
      res.status(500).json({status:'failed'});
    }
  } );
  
  //BY ID
  router.get('/byid/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const row = await empleadosModel.getById(id);
      res.status(200).json({ status: 'ok', empleado: row });
    } catch (ex) {
      console.log(ex);
      res.status(500).json({ status: 'failed' });
    }
  });
  
module.exports = router;