const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('expense-tracker', 'root', 'admin', {
  dialect: 'mysql',
  host: 'localhost'
});

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

// Start the server
const PORT = 3000;
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
