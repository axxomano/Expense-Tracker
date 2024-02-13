const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('expense-tracker','root','admin',{
    dialect : 'mysql',
    host: 'localhost'
})

const Expense = sequelize.define('Expense', {
  idexpense: { // Update column name to idexpense
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Assuming this is your primary key
    autoIncrement: true // Assuming it auto-increments
  },
  expense: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expensetype: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: { // Add the email column
    type: DataTypes.STRING, // Change the data type accordingly
    allowNull: true // Update allowNull as needed
  }
}, {
    tableName: 'Expense',
    timestamps: true, // Enable timestamps
    createdAt: 'createdAt', // Set the name of the createdAt column
    updatedAt: 'updatedAt', // Set the name of the updatedAt column
  });


(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful.');

    //await Expense.sync({ force: true }); // force will delete previous data
    await Expense.sync(); // without force 

    console.log('Expense model synced with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = Expense;
