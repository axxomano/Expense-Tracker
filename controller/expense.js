const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

router.post('/add', async (req, res) => {
  console.log(req.body); // Log the entire request body
  const { expense, description, expensetype } = req.body;

  try {
    if (!expense) {
      return res.status(400).json({ message: 'Expense is required' });
    }
    else if (!description) {
      return res.status(400).json({ message: 'Description is required' });
    }
    else if (!expensetype) {
      return res.status(400).json({ message: 'Expensetype is required' });
    }

    const newExpense = await Expense.create({ expense, description, expensetype });
    return res.status(201).json({ message: 'Expense created successfully', expense: newExpense });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/expenses/getAll', async (req, res) => {
  try {
    // Fetch all expenses from the database
    const allExpenses = await Expense.findAll();

    // Return the fetched expenses as a response
    return res.status(200).json({ expenses: allExpenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expenseToDelete = await Expense.findByPk(id);
    if (!expenseToDelete) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expenseToDelete.destroy();
    return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
