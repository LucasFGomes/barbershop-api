const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Client = require('../models/Client');
const Address = require('../models/Address');
const Service = require('../models/Service');
const Employee = require('../models/Employee');


const connection = new Sequelize(dbConfig);

Address.init(connection);
Client.init(connection);
Service.init(connection);
Employee.init(connection);

Address.associate(connection.models);
Client.associate(connection.models);
Service.associate(connection.models);
Employee.associate(connection.models);


module.exports = connection;
