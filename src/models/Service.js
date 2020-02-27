const { Model, DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsToMany(models.Client, { foreignKey: 'service_id', through: 'schedules', as: 'clients' });
    this.belongsToMany(models.Employee, { foreignKey: 'service_id', through: 'employees_services', as: 'employees' });
  }
}

module.exports = Service;