const { Model, DataTypes } = require('sequelize');

class Client extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'client_id', as: 'addresses' });
    this.belongsToMany(models.Service, { foreignKey: 'client_id', through: 'schedules', as: 'clients' });
  }
}

module.exports = Client;