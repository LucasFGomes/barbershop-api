const express = require('express');
const ClientController = require('./controllers/ClientController');
const AddressController = require('./controllers/AddressController');
const ServiceController = require('./controllers/ServiceController');
const EmployeeController = require('./controllers/EmployeeController');

const router = express.Router();

// router.get('/', (req, res) => {
//   return res.json({ message: 'Está funcionando!' });
// });

//CLIENTS
router.get('/clients', ClientController.index);
router.post('/clients', ClientController.store);

//ADDRESSES
router.get('/addresses', AddressController.index);
router.post('/clients/:client_id/addresses', AddressController.store);

//EMPLOYEES
router.get('/employees', EmployeeController.index);
router.post('/employees', EmployeeController.store);

//SERVICES
router.get('/services', ServiceController.index);
router.post('/employees/:employee_id/services', ServiceController.store);



module.exports = router;