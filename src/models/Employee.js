const { Model, DataTypes } = require('sequelize');

class Employee extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      cpf: DataTypes.STRING(11),
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Service, { foreignKey: 'employee_id', through: 'employees_services', as: 'services' });
  }
}

module.exports = Employee;