const Service = require('../models/Service');
const Employee = require('../models/Employee');

module.exports = {

  async index(req, res) {

    const service = await Service.findAll({
      include: { association: 'employees', through: { attributes: [] } },
    });

    return res.json(service);

  },

  async store(req, res) {

    const { employee_id } = req.params;
    const { name, price } = req.body;

    const employee = await Employee.findByPk(employee_id);

    if (!employee) {
      return res.status(400).json({ error: 'Funcionário não encontrado.' });
    }

    const [service] = await Service.findOrCreate({ where: { name, price } });

    await employee.addService(service);

    return res.json(service);

  },

  async verifyService(service) {
    const serviceFound = await Service.findOne({ where: { name: service.name } });

    if (!serviceFound) return await Service.create({ name: service.name, price: service.price });

    return serviceFound;

  }
}