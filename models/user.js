const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('expense-tracker','root','admin',{
    dialect : 'mysql',
    host: 'localhost'
})

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful.');

    //await User.sync({ force: true }); // force will delete previous data
    await User.sync(); // without force 

    console.log('User model synced with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = User;