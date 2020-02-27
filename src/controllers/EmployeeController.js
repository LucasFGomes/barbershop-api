const Employee = require('../models/Employee');
const Service = require('../models/Service');

const ServiceController = require('../controllers/ServiceController');

module.exports = {
  async index(req, res) {

    const employees = await Employee.findAll({
      include: { association: 'services', through: { attributes: [] } }
    });

    return res.json(employees);
  },

  async verifyService(service) {
    const serviceFound = await Service.findOne({ where: service.name });

    if (!serviceFound) await Service.create({ name: service.name, price: service.price });

    return serviceFound;

  },

  async store(req, res) {

    try {
      const { name, cpf, email, password, admin, service } = req.body;

      if (!service) {
        return res.status(404).json({ error: 'O campo service não pode ser nulo.' });
      }

      const employeeFound = await Employee.findOne({ where: { cpf } });

      if (employeeFound) {
        return res.json({ error: 'Funcionário já existe.' });
      }

      const serviceChecked = await ServiceController.verifyService(service);

      const [employee] = await Employee.findOrCreate({ where: { name, cpf, email, password, admin } });
      await serviceChecked.addEmployee(employee);

      return res.json(employee);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },


}